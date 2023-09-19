import dotenv from 'dotenv'
import express from 'express';
import mongoose from 'mongoose';
import Messages from './models/dbmessages.js';
import Pusher from 'pusher';
import cors from 'cors';

//app config
dotenv.config();
const app = express();
const port = process.env.PORT || 8000
const pusher = new Pusher({
    appId: "1673183",
    key: "f27faaf8427d2df3c102",
    secret: "02d9d4778a15b91d880f",
    cluster: "eu",
    useTLS: true,
});

//middleware
app.use(express.json());
app.use(cors());

//db
mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once('open', ()=>{
    console.log('Db is connected');

    const msgCollection = db.collection('messagecontents');
    const changeStream = msgCollection.watch();
    
    changeStream.on('change', (change)=>{
        console.log("A change occured", change)
        if(change.operationType === 'insert'){
            const messageDetails = change.fullDocument;
            pusher.trigger('messages', 'inserted', {
                name: messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
                received: messageDetails.received,
            })
        } else{
            console.log('error triggering pusher');
        }
    })
});

//api routes
app.get('/', (req, res)=> res.status(200).send('hello world'));

app.get('/message/sync', async (req, res) => {
    try {
        const messages = await Messages.find(); 
        res.status(200).json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Nastala chyba při získávání zpráv.' });
    }
});


app.post('/messages/new', async (req,res)=>{
    try {
        const dbMessage = req.body;
        const message = await Messages.create(dbMessage);
        res.status(201).json(message);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Nepodařilo se vytvořit zprávu.' });
    }
});


//server listening
app.listen(port,()=>console.log(`Listening on localhost:${port}`));