import React from 'react'
import TrendingData from '../components/TrendingData'
import { useTypedSelector } from '../hooks/useTypedSelector'
import DiscoverMovies from '../components/DiscoverMovies'
import DiscoverSeries from '../components/DiscoverSeries'
import { useActions } from '../hooks/useActions'

const Discover = () => {
  const { type } = useTypedSelector(state => state.discover)
  const { setDiscoverType, setDiscoverResultsType } = useActions()

  return (
    <div className='font-medium'>
      <div className='flex justify-center py-1 gap-x-6 text-xl bg-mygray2'>
        <div
          onClick={() => {
            setDiscoverType('trending')
            setDiscoverResultsType('Trending')
          }}
          className={`cursor-pointer ${type === 'trending' ? 'text-yellow-500' : 'text-white'}`}
        >
          Trending
        </div>
        <div
          onClick={() => {
            setDiscoverType('movies')
            setDiscoverResultsType('Popular movies')
          }}
          className={`cursor-pointer ${type === 'movies' ? 'text-yellow-500' : 'text-white'}`}
        >
          Movies
        </div>
        <div
          onClick={() => {
            setDiscoverType('series')
            setDiscoverResultsType('Popular series')
          }}
          className={`cursor-pointer ${type === 'series' ? 'text-yellow-500' : 'text-white'}`}
        >
          Series
        </div>
      </div>
      {type === 'trending' && <TrendingData />}
      {type === 'movies' && <DiscoverMovies />}
      {type === 'series' && <DiscoverSeries />}
    </div>
  )
}

export default Discover