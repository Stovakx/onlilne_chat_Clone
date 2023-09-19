import React, { useState } from 'react';
import axios from '../../utils/axios';
import EmojiPicker from 'emoji-picker-react';
import { Avatar, IconButton } from '@mui/material';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import MicOutlinedIcon from '@mui/icons-material/MicOutlined';

import "./chat.css";

export default function Chat({ messages }) {
  const [selectedEmoticons, setSelectedEmoticons] = useState([]); // Stav pro vybrané emotikony
  const [input, setInput] = useState('');
  const [showPicker, setShowPicker] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();

    // Kombinace textu z textového pole a vybraných emotikonů
    const messageWithEmoticons = input + ' ' + selectedEmoticons.join(' ');

    // Odešlání zprávy s emotikony
    await axios.post("/messages/new", {
      message: messageWithEmoticons,
      name: "Demo user",
      timestamp: new Date().toUTCString(),
      received: false
    });

    // Vyčištění textového pole
    setInput('');
  };

  const emojiOnClick = (event, emojiObject) => {
    setSelectedEmoticons((prevEmoticons) => [...prevEmoticons, emojiObject.emoji]);
    setShowPicker(false);
  };

  return (
    <div className='chatWindow'>
      <div className='chatHeader'>
        <Avatar />
        <div className='chatHeaderInfo'>
          <h3>Chat name</h3>
          <p>last seen etc</p>
        </div>
        <div className='chatHeaderIcons'>
          <IconButton>
            <SearchOutlinedIcon />
          </IconButton>
          <IconButton>
            <AttachFileOutlinedIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className='chatBody'>
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <p key={index} className={`message ${message.received ? '' : 'chatReceiver'}`}>
              <span className='userName'>{message.name}</span>
              <span>{message.message}</span>
              <span className='chat_timestamp'>{new Date().toUTCString()}</span>
            </p>
          ))
        ) : (
          <p>No messages</p>
        )}
      </div>

      <div className='chatFooter'>
        {showPicker && (
          <div className="picker-container">
            <EmojiPicker onEmojiClick={emojiOnClick} />
          </div>
        )}
        <IconButton onClick={() => setShowPicker((val) => !val)}>
          <EmojiEmotionsOutlinedIcon />
        </IconButton>
        <form onSubmit={sendMessage}>
          <div className="selected-emoticons">
            {selectedEmoticons.map((emoji, index) => (
              <span key={index} className="selected-emoji">{emoji}</span>
            ))}
          </div>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Type a message'
            type='text'
          />
          <button type='submit' className='sendingBtn'>
            <SendOutlinedIcon />
          </button>
        </form>
        <MicOutlinedIcon />
        {/* nahrávání zprávy pomocí hlasu */}
      </div>
    </div>
  )
}
