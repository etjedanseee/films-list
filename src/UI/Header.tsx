import React from 'react'
import Search from '../components/Search'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'
import { ReactComponent as ArrowBackIcon } from '../assets/arrow-back.svg'

const Header = () => {
  const navigate = useNavigate()

  const onGoBackClick = () => {
    navigate(-1)
  }

  return (
    <div className='sticky top-0 bg-bg1 z-30 flex justify-between gap-x-8 border-b-2 px-3 py-2'>
      <div className='flex-1 flex items-start gap-x-4'>
        <div className='mt-1 p-1 border-[1px] border-white rounded-full hover:cursor-pointer'>
          <ArrowBackIcon
            className='fill-white h-6 w-6'
            onClick={onGoBackClick}
          />
        </div>
        <Search />
      </div>
      <Navbar />
    </div>
  )
}

export default Header