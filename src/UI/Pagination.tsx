import React from 'react'
import Loader from './Loader'

interface PaginationProps {
  currentPage: number,
  totalPages: number,
  onPageClick: (page: number) => void,
}

const Pagination = ({ currentPage, onPageClick, totalPages }: PaginationProps) => {
  const createPages = () => {
    const pageNumbers = []
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (currentPage <= 3) {
      endPage = Math.min(5, totalPages);
    }

    if (currentPage >= totalPages - 2) {
      startPage = Math.max(totalPages - 4, 1);
    }

    if (startPage > 1) {
      pageNumbers.push(1, '...');
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (endPage < totalPages - 1) {
      pageNumbers.push('...', totalPages);
    }

    return pageNumbers
  }
  const hiddenArr = createPages()

  if (!totalPages) {
    return <div><Loader size='50' /></div>
  }

  return (
    <div className='flex gap-x-1 py-2 text-white xs:flex-nowrap gap-y-2 justify-center'>
      {!!hiddenArr.length && hiddenArr.map((num, i) => (
        <div
          className={`border-[1px] ${currentPage === num ? 'border-yellow-500 bg-yellow-500 text-black' : 'border-white'} 
            xs:w-10 xs:h-10 w-8 h-8 rounded-lg xs:text-base text-sm flex justify-center items-center select-none cursor-pointer
            font-bold
          `}
          key={`${num}_${i}`}
          onClick={typeof num === 'string' ? () => { } : () => onPageClick(num)}
        >
          {num}
        </div>
      ))}
    </div>
  )
}

export default Pagination