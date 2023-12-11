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
    <div className='flex justify-between gap-x-8'>
      <div className='flex-1 flex items-start gap-x-4'>
        <div className='p-1 border-[1px] border-white rounded-full hover:cursor-pointer'>
          <ArrowBackIcon
            className='fill-white h-7 w-7'
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