import React, { useState } from 'react'
import { MediaTypeFilterOptions } from '../types/data'
import { mediaTypeFilterArr } from '../utils/consts'

interface MediaTypeFilterProps {
  mediaTypeFilter: MediaTypeFilterOptions,
  onMediaTypeFilterClick: (option: MediaTypeFilterOptions) => void,
}

const MediaTypeFilter = ({ mediaTypeFilter, onMediaTypeFilterClick }: MediaTypeFilterProps) => {
  const [isOptionsListOpen, setIsOptionsListOpen] = useState(false)

  const handleOptionsListOpen = () => {
    setIsOptionsListOpen(prev => !prev)
  }

  const handleOptionClick = (option: MediaTypeFilterOptions) => {
    onMediaTypeFilterClick(option)
    localStorage.setItem('mediaTypeFilter', option.title)
    handleOptionsListOpen()
  }

  return (
    <div className='relative flex gap-x-2 items-center font-medium text-lg'>
      <div
        className={`select-none text-white border-white border-2 rounded-md cursor-pointer xs:py-[2px] py-[5px]
          min-w-[100px] text-center text-base xs:text-lg
        `}
        onClick={handleOptionsListOpen}
      >
        {mediaTypeFilter.title}
      </div>
      {isOptionsListOpen && (
        <div className='absolute top-full mt-1 z-10 bg-mygray3 w-full text-center rounded-md flex flex-col gap-y-3 py-3'>
          {mediaTypeFilterArr.map(option => (
            <div
              key={option.type}
              className={`${option.type === mediaTypeFilter.type ? 'text-yellow-400' : 'text-white'} 
                cursor-pointer select-none leading-none font-bold
              `}
              onClick={() => handleOptionClick(option)}
            >
              {option.title}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MediaTypeFilter