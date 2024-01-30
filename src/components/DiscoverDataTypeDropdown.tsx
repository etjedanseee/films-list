import React, { useState } from 'react'

interface DiscoverDataTypeDropdownProps<T> {
  currentResultsType: T | string,
  options: T[],
  onSelectOption: (option: T) => void,
}

const DiscoverDataTypeDropdown = <T,>({ currentResultsType, options, onSelectOption }: DiscoverDataTypeDropdownProps<T>) => {
  const [isOptionsListOpen, setIsOptionsListOpen] = useState(false)

  const handleOptionsListOpen = () => {
    setIsOptionsListOpen(prev => !prev)
  }

  const handleOptionClick = (option: T) => {
    if (currentResultsType !== option) {
      onSelectOption(option)
    }
    handleOptionsListOpen()
  }

  return (
    <div className='relative flex gap-x-2 items-center font-medium text-lg mb-2'>
      <div
        className={`select-none text-white border-white border-2 rounded-md cursor-pointer px-3 py-1
          text-center text-base xs:text-lg
        `}
        onClick={handleOptionsListOpen}
      >
        {`${currentResultsType}`}
      </div>
      {isOptionsListOpen && (
        <div className='absolute top-full mt-1 z-10 bg-mygray3 px-3 text-center rounded-md flex flex-col gap-y-3 py-3'>
          {options.map(option => (
            <div
              key={`${option}`}
              className={`${option === currentResultsType ? 'text-yellow-400' : 'text-white'} 
                cursor-pointer select-none leading-none font-bold
              `}
              onClick={() => handleOptionClick(option)}
            >
              {`${option}`}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default DiscoverDataTypeDropdown