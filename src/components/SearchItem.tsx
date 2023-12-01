import React from 'react'
import { ISearchDataItem } from '../types/search'

interface SearchItemProps {
  item: ISearchDataItem
}

const SearchItem = ({ item }: SearchItemProps) => {
  return (
    <div>
      <div className='text-sm'>{item.title}</div>
      <div>{item.releaseDate}</div>
      <div>{item.vote.toFixed(2)}</div>
    </div>
  )
}

export default SearchItem