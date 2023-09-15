import { useState } from 'react';
import Sidebar from './components/sidebar/Sidebar';
import Chat from './components/chat/Chat';

function App() {

  return (
    <div className='app'>
      <div className='appBody'>
        <Sidebar/>
        <Chat/>
      </div>
    </div>

  )
}

export default App
