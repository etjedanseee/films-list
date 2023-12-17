import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTypedSelector } from '../hooks/useTypedSelector'
import SearchItem from '../components/PreviewItem'
import Loader from '../UI/Loader'

const SearchResults = () => {
  const { loading, results } = useTypedSelector(state => state.search)
  const navigate = useNavigate()

  const onPreviewItemClick = (dataId: number) => {
    navigate(`/data/${dataId}`)
  }

  if (loading) {
    return (
      <div className='flex-1 flex justify-center items-center'><Loader size='80' /></div>
    )
  }

  return (
    <div className='px-2'>
      {!!results.length ? (
        <div className='mb-3 text-xl font-medium mt-1'>Results:</div>
      )
        : (
          <div className='text-xl font-medium mt-3'>No found results. Note: search in English.</div>
        )
      }
      <div className='flex flex-wrap items-stretch gap-x-2 gap-y-4'>
        {!!results.length && results.map(res => (
          <SearchItem
            item={res}
            onItemClick={onPreviewItemClick}
            key={res.dataId}
          />
        ))}
      </div>
    </div>
  )
}

export default SearchResults