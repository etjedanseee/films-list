import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { privateRoutes, publicRoutes } from './utils/routes';
import { useTypedSelector } from './hooks/useTypedSelector';
import { useActions } from './hooks/useActions';
import Header from './UI/Header';
import Loader from './UI/Loader';
import { checkUserSession } from './API/checkUserSession';

function App() {
  const { user } = useTypedSelector(state => state.auth)
  const { lists } = useTypedSelector(state => state.lists)
  const { sites } = useTypedSelector(state => state.sites)
  const { data } = useTypedSelector(state => state.data)
  const { fetchLists, fetchSites, setUser, setResults, fetchData, setLastSearch, setSearchPage, setSearchTotalPages } = useActions()
  const [isCheckingSession, setIsCheckingSession] = useState(true)

  useEffect(() => {
    checkUserSession(setUser, setIsCheckingSession)
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
    if (user && !data.length) {
      fetchData()
    }
  }, [user, data.length])

  useEffect(() => {
    const lastResults = localStorage.getItem('searchResults')
    const lastSearch = localStorage.getItem('lastSearch')
    const page = localStorage.getItem('page')
    const totalPages = localStorage.getItem('totalPages')
    if (lastResults) {
      setResults(JSON.parse(lastResults), 1)
    }
    if (page) {
      setSearchPage(+page)
    }
    if (totalPages) {
      setSearchTotalPages(+totalPages)
    }
    if (lastSearch) {
      setLastSearch(lastSearch)
    }
  }, [])

  if (isCheckingSession) {
    return (
      <div className='flex-1 flex justify-center items-center bg-mygray'>
        <Loader size='80' />
      </div>
    )
  }

  return (
    <div className='flex-1 bg-bg1 flex flex-col'>
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
