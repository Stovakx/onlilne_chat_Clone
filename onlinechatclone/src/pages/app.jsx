import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Chat from "../components/chat/Chat";
import Pusher from "pusher-js";
import axios from "../utils/axios";

function App() {
  const [messages, setMessages] = useState([]);
 
  useEffect(() => {
    axios.get("/app/message/sync").then((response) => {
      setMessages(response.data);
    });
  }, []);

  useEffect(() => {
    Pusher.logToConsole = true;
    const pusher = new Pusher("f27faaf8427d2df3c102", {
      cluster: "eu",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", (newMessage) => {
      setMessages([...messages, newMessage]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);
  return (
      <div className="appBody">
       
       
          <Sidebar 

          />
        
          <Chat 
            messages={messages}
            
          />
      </div>
  );
}

export default App;
