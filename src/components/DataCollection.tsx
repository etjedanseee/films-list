import React, { useEffect, useState } from 'react'
import { ICollection, IDataAdditionalInfo } from '../types/data'
import { fetchCollection } from '../API/fetchCollection'
import Loader from '../UI/Loader'
import { NavLink } from 'react-router-dom'
import { formatVote } from '../utils/formatVote'
import { ReactComponent as StarIcon } from '../assets/star.svg'

interface DataCollectionProps {
  additionalInfo: IDataAdditionalInfo | null,
  dataId: number,
}

const DataCollection = ({ additionalInfo, dataId }: DataCollectionProps) => {
  const [collection, setCollection] = useState<ICollection | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if ((!collection || !collection.parts.find(item => item.dataId === +dataId)) && additionalInfo && additionalInfo.belongsToCollection) {
      fetchCollection({
        collectionId: additionalInfo.belongsToCollection.id,
        collectionName: additionalInfo.belongsToCollection.name,
        setCollection,
        setLoading,
      })
    }
  }, [additionalInfo, collection, dataId])

  if (loading) {
    return (
      <div className='flex justify-center py-3'><Loader size='50' /></div>
    )
  }

  return (
    <>
      {collection && (
        <div className='px-2 mt-3 pb-3'>
          <div className='font-bold text-xl leading-tight mb-2'>{collection.name}:</div>
          <div className='flex flex-col gap-y-1 px-3 bg-mygray2 rounded-md py-2'>
            {collection.parts.map((item, index) => (
              <NavLink
                to={`/data/movie/${item.dataId}`}
                className='flex items-center gap-x-4 font-medium'
                key={`${item.dataId}-${item.fullPosterUrl}`}
              >
                <div className='text-gray-300 min-w-[20px]'>{collection.parts.length - index}</div>
                <div
                  className={`flex-1 text-lg leading-none truncate 
                    ${item.dataId === dataId && 'text-yellow-500'}
                  `}
                  title={item.title}
                >
                  {item.title}
                </div>
                <div className='min-w-[85px]'>{item.releaseDate}</div>
                <div className='flex gap-x-1 items-center'>
                  <StarIcon className='h-6 w-6 -mt-[1px] fill-yellow-500' />
                  <div className='min-w-[30px]'>{formatVote(item.vote)}</div>
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default DataCollection