import React, from "react";
import "./sidebar.css";
import { Avatar, IconButton } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SidebarChat from "../sidebarChat/SidebarChat";
export default function Sidebar() {

  return (
    <div className="sidebar">
      <div className="header">
        {/* src avatar, user profilePhoto */}
        <Avatar />
        <div className="right">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar_search">
        <div className="searchContainer">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search or start new chat" />
        </div>
      </div>
      <div className="sidebarChats">
        <SidebarChat 
           
        />
      </div>
    </div>
  );
}
