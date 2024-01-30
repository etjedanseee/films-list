import { toast } from "react-toastify"
import { IPreviewDataItem } from "../types/search"
import { baseImageUrl, posterSizes } from "../utils/consts"

interface ISearchDataInfo {
  title: string,
  page: number,
  setLoading: (b: boolean) => void,
  setSearchResults: (arr: IPreviewDataItem[], page: number) => void,
  setSearchTotalPages: (totalPages: number) => void,
}

interface ISearchDataInfoResponse {
  page: number,
  results: any[],
  total_pages: number,
}

export const searchDataInfo = async ({ title, page, setLoading, setSearchResults, setSearchTotalPages }: ISearchDataInfo) => {
  const url = 'https://api.themoviedb.org/3/search/multi'
  const API_KEY = process.env.REACT_APP_MOVIE_DB_API_KEY
  const ACCESS_TOKEN = process.env.REACT_APP_MOVIE_DB_ACCESS_TOKEN
  if (!API_KEY && !ACCESS_TOKEN) {
    throw new Error('No API_KEY and ACCESS_TOKEN')
  }
  setLoading(true)
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${ACCESS_TOKEN || API_KEY}`
    }
  }
  const results: IPreviewDataItem[] = []
  try {
    const response = await fetch(`${url}?query=${title}&page=${page}&language=en-US`, options)
    const data: ISearchDataInfoResponse = await response.json()
    const items = data?.results
    if (items && Array.isArray(items) && items.length > 0) {
      const imageSize = posterSizes[2]
      for (const item of items) {
        if (item.media_type === 'person') {
          continue;
        }
        const posterPath = item?.poster_path || item?.backdrop_path || '';
        const obj: IPreviewDataItem = {
          dataId: item?.id,
          title: item?.name || item?.title || item?.original_title || item?.original_name || '',
          fullPosterUrl: posterPath ? baseImageUrl + imageSize + posterPath : '',
          mediaType: item?.media_type || 'movie',
          releaseDate: item?.release_date || item?.first_air_date || '',
          vote: item?.vote_average || 0,
        };
        results.push(obj)
      }
      setSearchTotalPages(data.total_pages)
      setSearchResults(results, data.page)
    } else {
      setSearchResults([], 1)
      setSearchTotalPages(0)
    }
  } catch (e) {
    console.error('Error fetch dataInfo', e)
    toast.error(`Error search data: ${e}`)
  } finally {
    setLoading(false)
  }
}
