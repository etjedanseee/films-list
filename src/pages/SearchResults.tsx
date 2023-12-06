import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTypedSelector } from '../hooks/useTypedSelector'
import SearchItem from '../components/PreviewItem'

const SearchResults = () => {
  const { loading, results } = useTypedSelector(state => state.search)
  const navigate = useNavigate()

  const onPreviewItemClick = (dataId: number) => {
    navigate(`/data/${dataId}`)
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div className='mb-3'>Results:</div>
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