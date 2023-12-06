import React from 'react'
import { ILink, ISearchDataItem } from '../types/search'
import noPicture from '../assets/noPicture.jpg'
import DataListManager from '../UI/DataListManager'
import { getVoteBgColor } from '../utils/getVoteBgColor'
import { formatVote } from '../utils/formatVote'
interface SearchItemProps {
  item: ISearchDataItem,
  onItemClick: (dataId: number) => void,
  sitesResults?: ILink[],
}

const PreviewItem = ({ item, onItemClick, sitesResults }: SearchItemProps) => {
  const { fullPosterUrl, dataId, mediaType, releaseDate, title, vote } = item

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
            ${getVoteBgColor(vote)} text-zinc-800 font-medium
          `}>
            {formatVote(vote)}
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
      {sitesResults && !!sitesResults.length && (
        <DataListManager
          searchDataItem={item}
          sitesResults={sitesResults}
          isHideListsTitles={true}
        />
      )}
    </div>
  )
}

export default PreviewItem