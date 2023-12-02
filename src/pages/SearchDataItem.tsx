import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { ISearchDataItem } from '../types/search'
import noPicture from '../assets/noPicture.jpg'
import { changeImageSizePath } from '../utils/changeImageSizePath'

const SearchDataItem = () => {
  const { id } = useParams()
  const { results } = useTypedSelector(state => state.search)
  const [item, setItem] = useState<ISearchDataItem | null>(null)

  useEffect(() => {
    if (!id) {
      return;
    }
    const findItem = results.find(r => r.id === +id)
    if (findItem) {
      setItem(findItem)
    }
  }, [id, results])

  useEffect(() => {
    if (item) {
      //fetchAdditionalInfo
    }
  }, [item])

  if (!item) {
    return <div>Loading...</div>
  }

  return (
    <div className='mt-3 px-4'>
      <div className='text-2xl font-medium mb-3'>{item.title}</div>
      <div>
        <img
          src={changeImageSizePath(item.fullPosterUrl) || noPicture}
          alt="poster"
        />
      </div>
    </div>
  )
}

export default SearchDataItem