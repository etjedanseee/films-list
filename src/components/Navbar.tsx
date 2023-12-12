import React from 'react'
import { NavLink } from 'react-router-dom'
import { useActions } from '../hooks/useActions'

const Navbar = () => {
  const { setLastSearch } = useActions()

  const onListsPageClick = () => {
    setLastSearch('')
    localStorage.removeItem('lastSearch')
  }

  return (
    <div className='flex gap-x-6 text-xl px-4 pt-[6px] font-bold tracking-wider'>
      <NavLink
        to={'/'}
        className={`px-2 hover:cursor-pointer hover:text-yellow-400 transition-colors duration-300`}
        onClick={onListsPageClick}
      >
        Lists
      </NavLink>
      <NavLink
        to={'/settings'}
        className={`px-2 hover:cursor-pointer hover:text-yellow-400 transition-colors duration-300`}
      >
        Settings
      </NavLink>
    </div>
  )
}

export default Navbar