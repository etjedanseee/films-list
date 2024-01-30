import { DiscoverResultsType } from './../../types/discover';
import { Dispatch } from "react"
import { DiscoverAction, DiscoverActionTypes, DiscoverType, IFetchDiscoverDataResponse } from "../../types/discover"
import { IPreviewDataItem, MediaType } from "../../types/search"
import { baseImageUrl, posterSizes } from "../../utils/consts"

export const setDiscoverResults = (resultsType: DiscoverResultsType, results: IPreviewDataItem[]) => {
  return (dispatch: Dispatch<DiscoverAction>) => {
    dispatch({
      type: DiscoverActionTypes.SET_DISCOVER_RESULTS,
      payload: {
        results,
        resultsType,
      }
    })
  }
}

export const setDiscoverLoading = (b: boolean) => {
  return (dispatch: Dispatch<DiscoverAction>) => {
    dispatch({
      type: DiscoverActionTypes.SET_DISCOVER_LOADING,
      payload: b
    })
  }
}

export const setDiscoverTotalPages = (totalPages: number) => {
  return (dispatch: Dispatch<DiscoverAction>) => {
    dispatch({
      type: DiscoverActionTypes.SET_DISCOVER_TOTAL_PAGES,
      payload: totalPages
    })
  }
}

export const setDiscoverPage = (page: number) => {
  return (dispatch: Dispatch<DiscoverAction>) => {
    dispatch({
      type: DiscoverActionTypes.SET_DISCOVER_PAGE,
      payload: page
    })
  }
}

export const setDiscoverType = (type: DiscoverType) => {
  return (dispatch: Dispatch<DiscoverAction>) => {
    dispatch({
      type: DiscoverActionTypes.SET_DISCOVER_TYPE,
      payload: type
    })
  }
}

export const setDiscoverResultsType = (type: DiscoverResultsType) => {
  return (dispatch: Dispatch<DiscoverAction>) => {
    dispatch({
      type: DiscoverActionTypes.SET_DISCOVER_RESULTS_TYPE,
      payload: type
    })
  }
}

interface fetchDiscoverDataProps {
  url: string,
  page: number,
  resultsType: DiscoverResultsType,
  dataMediaType: MediaType,
  setLoading: (b: boolean) => void,
  setTotalPages: (totalPages: number) => void,
  setPage: (page: number) => void,
}

const fetchDiscoverData = ({ url, resultsType, page, dataMediaType, setLoading, setTotalPages, setPage }: fetchDiscoverDataProps) => {
  return async (dispatch: Dispatch<DiscoverAction>) => {
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
    try {
      const response = await fetch(`${url}?page=${page}&language=en-US`, options)
      const data: IFetchDiscoverDataResponse = await response.json()
      const items = data?.results
      const results: IPreviewDataItem[] = []
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
            mediaType: item?.media_type || (dataMediaType === 'all' ? 'movie' : dataMediaType),
            releaseDate: item?.release_date || item?.first_air_date || '',
            vote: item?.vote_average || 0,
          };
          results.push(obj)
        }
      }
      setTotalPages(data.total_pages)
      setPage(page)
      dispatch({
        type: DiscoverActionTypes.SET_DISCOVER_RESULTS,
        payload: {
          results,
          resultsType,
        }
      })
    } catch (e) {
      console.error(`Error fetch discover data (${resultsType}): ${e}`)
    } finally {
      setLoading(false)
    }
  }
}

interface fetchDiscoverDataHelperProps {
  page: number,
  setLoading: (b: boolean) => void,
  setTotalPages: (totalPages: number) => void,
  setPage: (page: number) => void,
  resultsType: DiscoverResultsType,
}

export const fetchDiscoverDataHelper = ({ page, setLoading, setTotalPages, setPage, resultsType }: fetchDiscoverDataHelperProps) => {
  let url = ''
  let dataMediaType: MediaType = 'all'
  switch (resultsType) {
    case 'Trending': {
      url = 'https://api.themoviedb.org/3/trending/all/week'
      dataMediaType = 'all'
      break
    }
    case 'Popular movies': {
      url = 'https://api.themoviedb.org/3/movie/popular'
      dataMediaType = 'movie'
      break
    }
    case 'Now playing movies': {
      url = 'https://api.themoviedb.org/3/movie/now_playing'
      dataMediaType = 'movie'
      break
    }
    case 'Top rated movies': {
      url = 'https://api.themoviedb.org/3/movie/top_rated'
      dataMediaType = 'movie'
      break
    }
    case 'Popular series': {
      url = 'https://api.themoviedb.org/3/tv/popular'
      dataMediaType = 'tv'
      break
    }
    case 'Top rated series': {
      url = 'https://api.themoviedb.org/3/tv/top_rated'
      dataMediaType = 'tv'
      break
    }
    default: {
      url = 'https://api.themoviedb.org/3/movie/popular'
      dataMediaType = 'all'
    }
  }
  return fetchDiscoverData({
    url,
    page,
    resultsType,
    dataMediaType,
    setLoading,
    setPage,
    setTotalPages,
  })
}