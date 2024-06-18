import { ICollection, IFetchCollectionResponse } from "../types/data"
import { IPreviewDataItem } from "../types/search"
import { baseImageUrl, posterSizes } from "../utils/consts"

interface fetchCollectionProps {
  collectionId: number,
  collectionName: string,
  setCollection: (coll: ICollection | null) => void,
  setLoading: (b: boolean) => void,
}

export const fetchCollection = async ({ collectionId, collectionName, setCollection, setLoading }: fetchCollectionProps) => {
  const url = 'https://api.themoviedb.org/3/collection'
  const API_KEY = process.env.REACT_APP_MOVIE_DB_API_KEY
  const ACCESS_TOKEN = process.env.REACT_APP_MOVIE_DB_ACCESS_TOKEN
  if (!API_KEY && !ACCESS_TOKEN) {
    throw new Error('No API_KEY and ACCESS_TOKEN')
  }
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${ACCESS_TOKEN || API_KEY}`
    }
  }
  setLoading(true)
  try {
    const response = await fetch(`${url}/${collectionId}?language=en-US`, options)
    if (response.status !== 200) {
      throw new Error('Fetch collection error:' + response.status)
    }
    const data: IFetchCollectionResponse = await response.json()
    const imageSize = posterSizes[2]
    const parts = data.parts
    const results: IPreviewDataItem[] = []
    for (let item of parts) {
      const posterPath = item?.poster_path || item?.backdrop_path || '';
      const obj: IPreviewDataItem = {
        dataId: item.id,
        title: item?.title || '',
        fullPosterUrl: posterPath ? baseImageUrl + imageSize + posterPath : '',
        mediaType: 'movie',
        releaseDate: item?.release_date || '',
        vote: item?.vote_average || 0,
      }
      results.push(obj)
    }
    const sortedResults = results.sort((a, b) => {
      const aDate = a.releaseDate
      const bDate = b.releaseDate
      if (!bDate.length) {
        return 1
      } else if (!aDate.length) {
        return -1
      } else return +new Date(b.releaseDate) - +new Date(a.releaseDate)
    })
    setCollection({
      id: collectionId,
      name: collectionName,
      parts: sortedResults,
    })
  } catch (e) {
    console.error('Error fetch collection:', e)
  } finally {
    setLoading(false)
  }
}