import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex gap-x-6 text-lg px-4'>
      <Link to={'/'} className='px-2'>Lists</Link>
      <Link to={'/settings'} className='px-2'>Settings</Link>
    </div>
  )
}

export default Navbar