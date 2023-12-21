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
          <div className='text-xl font-medium mt-3'>No results found. Note: try search in English.</div>
        )
      }
      <div className='w-full grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 3xl:grid-cols-8
      items-stretch justify-center md:justify-normal gap-x-3 gap-y-3'>
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