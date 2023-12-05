import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { ILink, ISearchDataItem } from '../types/search'
import noPicture from '../assets/noPicture.jpg'
import { changeImageSizePath } from '../utils/changeImageSizePath'
import DataListManager from '../UI/DataListManager'
import { IDataAdditionalInfo } from '../types/data'
import { fetchDataAdditionalInfo } from '../API/fetchAdditionalDataInfo'
import { formatMinToHours } from '../utils/formatMinToHours'
import { searchDataOnSites } from '../API/searchDataOnSites'
import Sites from '../components/Sites'
import Button from '../UI/Button'

const SearchDataItem = () => {
  const { id } = useParams()
  const { results } = useTypedSelector(state => state.search)
  const { sites } = useTypedSelector(state => state.sites)
  const { data } = useTypedSelector(state => state.data)
  const [item, setItem] = useState<ISearchDataItem | null>(null)
  const [additionalInfo, setAdditionalInfo] = useState<IDataAdditionalInfo | null>(null)
  const [infoLoading, setInfoLoading] = useState(false)
  const [sitesLoading, setSitesLoading] = useState(false)
  const [sitesResults, setSitesResults] = useState<ILink[]>([])
  const isSearchedOnSites = useRef(false)

  const onSearchOnSitesClick = () => {
    if (item && !isSearchedOnSites.current && sites.length) {
      isSearchedOnSites.current = true
      searchDataOnSites({
        search: item.title,
        year: item.releaseDate.slice(0, 4),
        // sites,
        sites: [sites[2]],
        setSitesResults,
        setLoading: setSitesLoading,
      })
    }
  }

  useEffect(() => {
    if (!id) {
      return;
    }
    const findItem = data.find(i => i.dataId === +id) || results.find(r => r.dataId === +id)
    if (findItem) {
      setItem(findItem)
    }
  }, [id, results, data])

  useEffect(() => {
    if (item && !additionalInfo) {
      const localAdInfo = localStorage.getItem('additionalInfo' + item.dataId)
      if (localAdInfo) {
        setAdditionalInfo(JSON.parse(localAdInfo))
      } else {
        fetchDataAdditionalInfo({
          dataId: item.dataId,
          mediaType: item.mediaType,
          setAdditionalInfo,
          setLoading: setInfoLoading,
        })
      }
    }
  }, [item, additionalInfo])

  useEffect(() => {
    if (item && additionalInfo) {
      localStorage.setItem('additionalInfo' + item.dataId, JSON.stringify(additionalInfo))
    }
  }, [additionalInfo, item])

  if (!item || infoLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className='mt-3 px-2 flex gap-x-10'>
      <div className='bg-mygray2 rounded-md p-4'>
        <div className='w-[342px] m-auto'>
          <div className='relative'>
            <img
              src={changeImageSizePath(item.fullPosterUrl) || noPicture}
              alt="poster"
            />
            <div className={`absolute top-0 left-0 px-3 py-2 
            ${item.mediaType === 'movie' ? 'bg-myblue' : 'bg-pink-700'} text-sm select-none
          `}>
              {item.mediaType === 'tv' ? 'series' : item.mediaType}
            </div>
          </div>
          <DataListManager
            searchDataItem={item}
            sitesResults={sitesResults}
          />
        </div>
      </div>
      <div>
        <div className='text-3xl font-medium mb-3'>{item.title}</div>
        {additionalInfo && (
          <div className='font-medium'>
            <span className='text-zinc-400'>Genres: </span>{additionalInfo.genres.join(', ')}
          </div>
        )}
        <div className='font-medium'>
          <span className='text-zinc-400'>Vote: </span>
          {item.vote.toFixed(1).lastIndexOf('.0') !== -1 ? item.vote.toFixed(0) : item.vote.toFixed(1)}
        </div>
        {additionalInfo && !!additionalInfo.runtime && (
          <div className='font-medium'>
            <span className='text-zinc-400'>Runtime: </span>{formatMinToHours(additionalInfo.runtime)}
          </div>
        )}
        <div className='font-medium'>
          <span className='text-zinc-400'>Release date:</span> {item.releaseDate}
        </div>
        {additionalInfo && (
          <div className='font-medium'>
            <span className='text-zinc-400'>Overview: </span>{additionalInfo.overview}
          </div>
        )}
        {isSearchedOnSites.current ?
          <Sites
            loading={sitesLoading}
            results={sitesResults}
          />
          : (
            <div>
              <Button
                onClick={onSearchOnSitesClick}
                title='Search on sites'
                className='mt-6'
              />
            </div>
          )
        }
      </div>
    </div>
  )
}

export default SearchDataItem