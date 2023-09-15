import React, {useState} from 'react';
import { Avatar, Icon, IconButton } from '@mui/material';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import MicOutlinedIcon from '@mui/icons-material/MicOutlined';
import "./chat.css";

export default function Chat() {
    const [message, setMessage]= useState();
    return (
        <div className='chatWindow'>
            <div className='chatHeader'>
                <Avatar/>
                <div className='chatHeaderInfo'>
                    <h3>Chat name</h3>
                    <p>last seen etc</p>
                </div>
                <div className='chatHeaderIcons'>
                    <IconButton>
                        <SearchOutlinedIcon/>
                    </IconButton>
                    <IconButton>
                        <AttachFileOutlinedIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                </div>
            </div>
            <div className='chatBody'>
                <p className='message'>
                    <span className='userName'>sender</span>
                    <span>This is the message</span>
                    <span className='chat_timestamp'>
                        {new Date().toUTCString()}
                    </span>
                </p>
                <p className='message chatReciever'>
                    <span className='userName'>sender</span>
                    <span>This is the message</span>
                    <span className='chat_timestamp'>
                        {new Date().toUTCString()}
                    </span>
                </p>
                <p className='message'>
                    <span className='userName'>sender</span>
                    <span>This is the message</span>
                    <span className='chat_timestamp'>
                        {new Date().toUTCString()}
                    </span>
                </p>
                <p className='message chatReciever'>
                    <span className='userName'>sender</span>
                    <span>This is the message</span>
                    <span className='chat_timestamp'>
                        {new Date().toUTCString()}
                    </span>
                </p>
            </div>
            <div className='chatFooter'>
                <IconButton>
                    <EmojiEmotionsOutlinedIcon/>
                </IconButton>
                <form>
                    <input
                        value={message}
                        onChange={(e)=> setMessage(e.target.value)}
                        placeholder='Type a message'
                        type='text'
                    />
                    <button type='submit' className='sendingBtn'>
                        <SendOutlinedIcon/>
                    </button>
                </form>
                <MicOutlinedIcon/>
            </div>
        </div>
    )
}
