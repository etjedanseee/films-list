import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { searchDataOnSites } from './API/searchDataOnSites';
import Home from './pages/Home';

function App() {
  useEffect(() => {
    // searchDataOnSites({ search: 'imitation game', sites: ['uakino.lu'] })
  }, [])
  return (
    <div className='flex-1 bg-bg1 flex flex-col h-full'>
      <Routes>
        <Route element={<AuthPage />} path='/auth' />
        <Route element={<Home />} path='/' />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;
