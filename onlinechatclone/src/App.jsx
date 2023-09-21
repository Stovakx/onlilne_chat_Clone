import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/layout';
import AppPage from './pages/app';
import IndexPage from './pages/index';

function App() {
  /* const isUserLoggedIn =  */
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<IndexPage/>}/>
        <Route path='/app' element={<AppPage/>}/>
      </Routes>
    </Layout>

  )
}
{/* isUserLoggedIn ? <Navigate to='/app' /> :  
logika pro to, když klient už bude přihlášen, aby ho to hned přesunulo na /app*/}
export default App
