import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Chat from "../components/chat/Chat";
import Pusher from "pusher-js";
import axios from "../utils/axios";

function App() {
  const [messages, setMessages] = useState([]);
  const [chatWindowOpen, setChatWindowOpen] = useState(false);

/*   const openChatWindow = () => {
    setChatWindowOpen(true);
  }; */

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
    <div className="app">
      <div className="appBody">
        <Sidebar 
          chatWindowOpen={chatWindowOpen}
          setChatWindowOpen={setChatWindowOpen}
        />
        <Chat 
          messages={messages}
          
         />
      </div>
    </div>
  );
}

export default App;
