import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthPage from './pages/AuthPage';

function App() {
  return (
    <div className='bg-zinc-800 text-white flex flex-col'>
      <Routes>
        <Route element={<AuthPage />} path='/auth' />
      </Routes>
    </div>
  );
}

export default App;
