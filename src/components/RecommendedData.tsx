import React, { useEffect, useState } from 'react'
import { MediaType } from '../types/search'
import { fetchRecommendedData } from '../API/fetchRecommendedData'
import Loader from '../UI/Loader'
import noPicture from '../assets/noPicture.jpg'
import { IRecommendedItem } from '../types/data'
import { changeImageSizePath } from '../utils/changeImageSizePath'
import { formatVote } from '../utils/formatVote'
import { ReactComponent as StarIcon } from '../assets/star.svg'
import { NavLink } from 'react-router-dom'

interface IRecommendedDataProps {
  mediaType: MediaType,
  dataId: number,
}

const RecommendedData = ({ dataId, mediaType }: IRecommendedDataProps) => {
  const [recommended, setRecommended] = useState<IRecommendedItem[] | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchRecommendedData({
      dataId,
      mediaType,
      setLoading,
      setRecommended,
    })
  }, [dataId, mediaType])

  if (loading) {
    return (
      <div className='flex justify-center'><Loader size='60' /></div>
    )
  }

  if (!recommended?.length) {
    return null
  }

  return (
    <div className='mb-3 px-2'>
      <div className='text-xl font-bold mb-2'>Recommendations</div>
      <div className='flex gap-x-2 overflow-x-auto pb-3'>
        {recommended && !!recommended.length && recommended.map(item => (
          <NavLink
            to={`/data/${item.mediaType}/${item.dataId}`}
            key={`${item.dataId}${item.mediaType}`}
            className='select-none'
          >
            <img
              src={changeImageSizePath(item.fullPosterUrl, 3) || noPicture}
              className='min-w-[250px] h-[140px] bg-cover rounded-lg'
              loading='lazy'
              alt=""
            />
            <div className='mt-1 font-bold text-sm xs:text-base leading-tight'>
              {item.title}
            </div>
            <div className='flex justify-between items-center'>
              <div className='text-sm'>
                {item.releaseDate?.slice(0, 4)}
              </div>
              {item.vote !== 0 && (
                <div className='text-sm flex gap-x-[2px] items-center'>
                  {formatVote(item.vote)}
                  <StarIcon className='h-6 w-6 -mt-[1px] fill-yellow-500' />
                </div>
              )}
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  )
}

export default RecommendedData