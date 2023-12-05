import React from 'react'
import { ISearchDataItem } from '../types/search'
import noPicture from '../assets/noPicture.jpg'
interface SearchItemProps {
  item: ISearchDataItem,
  onItemClick: (dataId: number) => void,
}

const SearchItem = ({ item, onItemClick }: SearchItemProps) => {
  const { fullPosterUrl, dataId, mediaType, releaseDate, title, vote } = item

  const voteBgColor = vote <= 5
    ? 'bg-orange-500'
    : vote <= 8
      ? 'bg-yellow-500'
      : 'bg-green-500'
  const mediaTypeBgColor = mediaType === 'movie'
    ? 'bg-myblue'
    : 'bg-pink-700'

  return (
    <div
      className='max-w-[185px] w-full cursor-pointer flex flex-col'
      onClick={() => onItemClick(dataId)}
    >
      <div className='relative'>
        <img
          src={fullPosterUrl || noPicture}
          alt="poster"
          className='w-[185px] h-[278px]'
        />
        {!!vote && (
          <div className={`absolute top-2 left-0 pl-2 pr-3 py-1 rounded-r-full text-sm select-none
            ${voteBgColor} text-zinc-800 font-medium
          `}>
            {vote.toFixed(1).lastIndexOf('.0') !== -1 ? vote.toFixed(0) : vote.toFixed(1)}
          </div>
        )}
        <div className={`absolute bottom-0 left-0 px-2 py-1 ${mediaTypeBgColor} text-xs select-none`}>
          {mediaType === 'tv' ? 'series' : mediaType}
        </div>
      </div>
      <div className='flex-1 bg-mygray flex flex-col py-3'>
        <div className='px-3 text-sm leading-tight font-bold mb-1'>{title}</div>
        <div className='text-xs px-3'>{releaseDate.slice(0, 4)}</div>
      </div>
    </div>
  )
}

export default SearchItem