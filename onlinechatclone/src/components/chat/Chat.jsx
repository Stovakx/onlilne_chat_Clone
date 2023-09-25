import React, { useState } from "react";
import axios from "../../utils/axios";
import EmojiPicker from "emoji-picker-react";
import { IconButton } from "@mui/material";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import MicOutlinedIcon from "@mui/icons-material/MicOutlined";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";

import "./chat.css";

export default function Chat({ messages, }) {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedEmoticons, setSelectedEmoticons] = useState([]);

  //
  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleEmojiClick = (emojiObject) => {
    setMessage((prevMessage) => prevMessage + emojiObject.emoji);
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    // Pokud je zpráva prázdná nebo obsahuje pouze bílé znaky, neposíláme ji
    if (!message.trim()) {
      return;
    }

    // Kombinace textu z textového pole a vybraných emotikonů
    const messageWithEmoticons = message + " " + selectedEmoticons.join(" ");

    // Odeslat zprávu s emotikony
    await axios.post("/app/chat/messages/new", {
      message: messageWithEmoticons,
      name: "Demo user",
      timestamp: new Date().toUTCString(),
      received: false,
    });

    // Vyčistit textové pole
    setMessage("");
    setSelectedEmoticons([]);
  };

  return (
    <div className={`chatWindow `}>
      <div className="chatHeader">
        <h3>Chat name</h3>
        <p>Last seen etc</p>
      </div>
      <div className="chatBody">
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <p
              key={index}
              className={`message ${message.received ? "" : "chatReceiver"}`}
            >
              <span className="userName">{message.name}</span>
              <span>{message.message}</span>
              <span className="chat_timestamp">{new Date().toUTCString()}</span>
            </p>
          ))
        ) : (
          <p>No messages</p>
        )}
      </div>
      <div className="chatFooter">
        {showEmojiPicker && (
          <div className="picker-container">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}
        <IconButton onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
          <EmojiEmotionsOutlinedIcon />
        </IconButton>
        <div className="selected-emoticons">
          {selectedEmoticons.map((emoji, index) => (
            <span key={index} className="selected-emoji">
              {emoji}
            </span>
          ))}
        </div>
        <form onSubmit={sendMessage}>
          <input
            value={message}
            onChange={handleInputChange}
            placeholder="Type a message"
            type="text"
            className="message-input"
          />
          <button type="submit" className="sendingBtn">
            <SendOutlinedIcon />
          </button>
        </form>
        <MicOutlinedIcon />
      </div>
    </div>
  );
}
