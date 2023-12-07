import React from 'react'
import { Link } from 'react-router-dom'
import { useActions } from '../hooks/useActions'

const Navbar = () => {
  const { setLastSearch } = useActions()

  const onListsPageClick = () => {
    setLastSearch('')
    localStorage.removeItem('lastSearch')
  }

  return (
    <div className='flex gap-x-6 text-lg px-4'>
      <Link to={'/'} className='px-2' onClick={onListsPageClick}>Lists</Link>
      <Link to={'/settings'} className='px-2'>Settings</Link>
    </div>
  )
}

export default Navbar