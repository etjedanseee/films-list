import React from 'react'
import { useParams } from 'react-router-dom'
import { useTypedSelector } from '../hooks/useTypedSelector'
import SearchItem from '../components/SearchItem'

const SearchResults = () => {
  const { search } = useParams()
  const { loading, results } = useTypedSelector(state => state.search)

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
            search={search || ''}
            key={res.dataId}
          />
        ))}
      </div>
    </div>
  )
}

export default SearchResults