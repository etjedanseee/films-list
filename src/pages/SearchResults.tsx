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
      <div className='grid grid-cols-4 gap-4'>
        {!!results.length && results.map(res => (
          <SearchItem item={res} key={res.id} />
        ))}
      </div>
    </div>
  )
}

export default SearchResults