import dotenv from 'dotenv'
import express from 'express';
import mongoose from 'mongoose';
import soloMessages from './models/solomessages.js';
import User from './models/user.js';
/*import jwt  from 'jsonwebtoken';
import registerMiddleware from './middleware/registration.js';
import loginMiddleware from './middleware/login.js';
import forgetDataMiddleware from './middleware/forgetdata' */
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

    const msgCollection = db.collection('solomessages');
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
app.get('/', async(req, res)=> {
    try {
        res.json({});
    } catch (error) {
        res.status(500).json({error:"Internal server error."})
    }
});

/* app.post('/register',registerMiddleware);


app.post('/login',loginMiddleware);

app.post('/forgetpw',forgetDataMiddleware);
 */
app.get('/app', async(req, res)=>{
    try {
        
        const user = await User.find(_id)
        const messages = await soloMessages.find();

        res.status(200).json({messages, user})
    } catch (error) {
        console.error(error);
        restart.status(500).json({error: 'Error loading app.'})
    }
})

/* app.get('/app/search',async(req, res)=>{

})
 */
app.get('/app/message/sync', async (req, res) => {
    try {
        const messages = await soloMessages.find(); 
        res.status(200).json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Nastala chyba při získávání zpráv.' });
    }
});

/* Použít po aktualizací modelů 
app.post('/app/messages/new', async (req, res) => {
    try {
        const dbMessage = req.body;
        const message = await soloMessages.create({
            ...dbMessage,
            sender: req.user._id, 
            receiver: 'ID_prijemce', // ID příjemce todo upravit podle potřeb
        });
        res.status(201).json(message);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Nepodařilo se vytvořit zprávu.' });
    }
}); */


app.post('/app/chat/messages/new', async (req,res)=>{
    try {
        const dbMessage = req.body;
        const message = await soloMessages.create(dbMessage);
        res.status(201).json(message);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Nepodařilo se vytvořit zprávu.' });
    }
});


//server listening
app.listen(port,()=>console.log(`Listening on localhost:${port}`));