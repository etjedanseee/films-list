import React, { useEffect } from 'react'
import { ICountDataInLists, IList } from '../types/lists'
import { ReactComponent as ArrowDownIcon } from '../assets/arrow-down.svg'
interface ListsDropdownProps {
  options: IList[],
  selectedOption: IList,
  setSelectedOption: (opt: IList) => void,
  isDropdownOpen: boolean,
  setIsDropdownOpen: (b: boolean) => void,
  countDataInLists: ICountDataInLists,
}

const ListsDropdown = ({ isDropdownOpen, options, selectedOption, setIsDropdownOpen, setSelectedOption, countDataInLists }: ListsDropdownProps) => {
  const handleDropdownOpen = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  useEffect(() => {
    if (isDropdownOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isDropdownOpen])

  return (
    <div className='relative font-medium flex-1 flex justify-center max-w-full'>
      <div
        onClick={handleDropdownOpen}
        className={`flex-1 flex justify-between items-center max-w-full hover:cursor-pointer select-none bg-mygray
          px-3 py-2 rounded-md mb-3
        `}
      >
        <div className='text-yellow-500 flex gap-x-1 max-w-full'>
          <div className='truncate text-inherit'>{`${selectedOption.name}`}</div>
          <div className='text-inherit'>({countDataInLists[selectedOption.id] || 0})</div>
        </div>
        <ArrowDownIcon className={`h-7 w-7 fill-yellow-500 ${isDropdownOpen ? 'rotate-90' : 'rotate-0'}`} />
      </div>
      {isDropdownOpen && (
        <div className={`absolute z-30 bg-bg2 top-full flex flex-col gap-y-2 px-3 -mt-1 w-full rounded-md py-2`}>
          {options.map(option => (
            <div
              onClick={() => setSelectedOption(option)}
              className={`flex gap-x-1 select-none ${option.id === selectedOption.id ? 'text-yellow-500' : 'text-white'}`}
              key={option.id}
            >
              <div className='truncate text-inherit'>{`${option.name}`}</div>
              <div className='text-inherit'>({countDataInLists[option.id] || 0})</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ListsDropdown