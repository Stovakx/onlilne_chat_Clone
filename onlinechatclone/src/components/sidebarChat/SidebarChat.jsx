import React from 'react';
import './sidebarChat.css';
import { Avatar } from '@mui/material';

export default function SidebarChat() {
  return (
    <div className='sidebarChat'>
        <Avatar/>
        <div className='sidebarChat_textDiv'>
            {/* connect to db, show user name + last msg */}
            <h2>user/chat name</h2>
            {/* seen/delivered icons */}
            <p>Last message</p>
        </div>
    </div>
  )
}
