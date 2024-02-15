import { IRecommendedItem } from "../types/data";
import { MediaType } from "../types/search";
import { baseImageUrl, posterSizes } from "../utils/consts";

interface IFetchRecommendedDataResponse {
  results: {
    id: number,
    name?: string,
    title?: string,
    poster_path?: string,
    backdrop_path?: string,
    media_type?: MediaType,
    release_date?: string,
    first_air_date?: string,
    vote_average?: number,
  }[],
}

interface fetchRecommendedDataProps {
  mediaType: MediaType,
  dataId: number,
  setLoading: (b: boolean) => void,
  setRecommended: (results: IRecommendedItem[] | null) => void,
}

export const fetchRecommendedData = async ({ dataId, mediaType, setLoading, setRecommended }: fetchRecommendedDataProps) => {
  const url = `https://api.themoviedb.org/3/${mediaType}/${dataId}/recommendations`
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
    const response = await fetch(`${url}?language=en-US`, options)
    if (response.status !== 200) {
      throw new Error('Error:' + response.status)
    }
    const data: IFetchRecommendedDataResponse = await response.json()
    const imageSize = posterSizes[2]
    setRecommended(data.results.map(item => {
      const posterPath = item?.backdrop_path || item?.poster_path || '';
      return {
        dataId: item.id || dataId,
        mediaType: item.media_type || mediaType,
        releaseDate: item?.release_date || item?.first_air_date || '',
        title: item?.name || item?.title || '',
        fullPosterUrl: posterPath ? baseImageUrl + imageSize + posterPath : '',
        vote: item.vote_average ?? 0,
      }
    }))
  } catch (e) {
    console.error('Error fetch recommended data', e)
  } finally {
    setLoading(false)
  }
}