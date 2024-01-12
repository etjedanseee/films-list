import React, { } from 'react'
import { ILink, IPreviewDataItem, MediaType } from '../types/search'
import noPicture from '../assets/noPicture.jpg'
import DataListManager from '../UI/DataListManager'
import { getVoteBgColor } from '../utils/getVoteBgColor'
import { formatVote } from '../utils/formatVote'
interface PreviewItemProps {
  item: IPreviewDataItem,
  onItemClick: (mediaType: MediaType, dataId: number) => void,
  sitesResults?: ILink[],
}

const PreviewItem = ({ item, onItemClick, sitesResults }: PreviewItemProps) => {
  const { fullPosterUrl, dataId, mediaType, releaseDate, title, vote } = item

  const mediaTypeBgColor = mediaType === 'movie'
    ? 'bg-myblue'
    : 'bg-pink-700'

  return (
    <div
      className='w-full cursor-pointer flex flex-col select-none'
      onClick={() => onItemClick(mediaType, dataId)}
    >
      <div className='relative flex-1'>
        <img
          src={fullPosterUrl || noPicture}
          alt="poster"
          className='w-full h-full bg-cover'
          loading='lazy'
        />
        {!!vote && (
          <div className={`absolute top-2 left-0 pl-2 pr-3 py-1 rounded-r-full text-sm 
            ${getVoteBgColor(vote)} text-zinc-800 font-medium
          `}>
            {formatVote(vote)}
          </div>
        )}
        <div className={`absolute bottom-0 left-0 px-2 py-1 ${mediaTypeBgColor} text-xs`}>
          {mediaType === 'tv' ? 'series' : mediaType}
        </div>
      </div>
      <div className='bg-mygray flex flex-col py-3'>
        <div className='px-3 text-sm leading-tight font-bold mb-1'>{title}</div>
        <div className='text-xs px-3'>{releaseDate.slice(0, 4)}</div>
      </div>
      {sitesResults && (
        <DataListManager
          previewDataItem={item}
          sitesResults={sitesResults}
          isHideListsTitles={true}
        />
      )}
    </div>
  )
}

export default PreviewItem