import React from 'react'
import { NavLink } from 'react-router-dom'
import { useActions } from '../hooks/useActions'
import { ReactComponent as BookmarkIcon } from '../assets/DataListManagerIcons/bookmark.svg'
import { ReactComponent as SettingsIcon } from '../assets/settings.svg'

const Navbar = () => {
  const { setLastSearch } = useActions()

  const onListsPageClick = () => {
    setLastSearch('')
    localStorage.removeItem('lastSearch')
  }

  return (
    <div className='flex gap-x-3 items-center font-bold tracking-wider'>
      <NavLink
        to={'/'}
        className={`px-1 hover:cursor-pointer`}
        onClick={onListsPageClick}
      >
        <BookmarkIcon className='h-10 w-10 fill-yellow-500' />
      </NavLink>
      <NavLink
        to={'/settings'}
        className={`px-1 hover:cursor-pointer`}
      >
        <SettingsIcon className='h-8 w-8 fill-white' />
      </NavLink>
    </div>
  )
}

export default Navbar