import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { privateRoutes, publicRoutes } from './utils/routes';
import { useTypedSelector } from './hooks/useTypedSelector';
import { useActions } from './hooks/useActions';
import supabase from './supabaseClient';
import NotFoundPage from './pages/NotFoundPage';
import Header from './UI/Header';

function App() {
  const { user } = useTypedSelector(state => state.auth)
  const { lists } = useTypedSelector(state => state.lists)
  const { sites } = useTypedSelector(state => state.sites)
  const { data } = useTypedSelector(state => state.data)
  const { fetchLists, fetchSites, setUser, setResults, fetchData } = useActions()
  const [isCheckingSession, setIsCheckingSession] = useState(true)
  const location = useLocation()

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()
        if (error) {
          throw new Error(error.message)
        }
        if (data.session) {
          setUser({ email: data.session.user.email || '', id: data.session.user.id })
        }
      } catch (e) {
        console.error('get session error', e)
      } finally {
        setIsCheckingSession(false)
      }
    }
    checkSession()
  }, [])

  useEffect(() => {
    if (user && !lists.length) {
      fetchLists()
    }
  }, [user, lists.length])

  useEffect(() => {
    if (user && !sites.length) {
      fetchSites()
    }
  }, [user, sites.length])

  useEffect(() => {
    if (user && !data.length && location.pathname !== '/') {
      fetchData()
    }
  }, [user, data.length, location.pathname])

  useEffect(() => {
    const lastResults = localStorage.getItem('searchResults')
    if (lastResults) {
      setResults(JSON.parse(lastResults))
    }
  }, [])

  if (isCheckingSession) {
    return (
      <div className='text-5xl'>Loading...</div>
    )
  }

  return (
    <div className='flex-1 bg-bg1 flex flex-col py-3 px-2'>
      {user && <Header />}
      <Routes>
        {user
          ? (
            <>
              {
                privateRoutes.map(route => (
                  <Route {...route} key={route.path} />
                ))
              }
            </>
          )
          : (
            <>
              {
                publicRoutes.map(route => (
                  <Route {...route} key={route.path} />
                ))
              }
            </>
          )}
        <Route path='*' element={<NotFoundPage />} />
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
