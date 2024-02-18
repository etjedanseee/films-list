import React from 'react'
import { IDataTrailer } from '../types/data'

interface DataTrailerProps {
  trailer: IDataTrailer,
}

const DataTrailer = ({ trailer }: DataTrailerProps) => {
  return (
    <div className='mt-2 px-2 mb-2 md:mb-3 flex flex-col items-center sm:items-start'>
      <a
        href={`https://www.youtube.com/watch?v=${trailer.key}`}
        target='_blank'
        rel="noreferrer"
        className='block font-bold text-lg mb-2 leading-tight'
      >
        {trailer.name} ({trailer.publishedAt.slice(0, 10)})
      </a>
      <iframe
        src={`https://www.youtube.com/embed/${trailer.key}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className='h-[200px] lg:h-[250px] max-w-xs lg:max-w-md w-full'
      ></iframe>

    </div>
  )
}

export default DataTrailer