import { ISearchDataItem } from "../types/searchSites"
import { posterSizes } from "../utils/consts"

interface ISearchDataInfo {
  title: string,
  setLoading: (b: boolean) => void,
  setResults: (arr: ISearchDataItem[]) => void
}

export const searchDataInfo = async (title: string) => {
  const url = 'https://api.themoviedb.org/3/search/multi'
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
  const resultsArr: ISearchDataItem[] = []
  //get genres by movie id
  //fetch(`https://api.themoviedb.org/3/movie/75780?append_to_response=genres`, options).then(res => res.json()).then(val => console.log(val))
  //get genres by serial id
  //fetch(`https://api.themoviedb.org/3/tv/1?append_to_response=genres`, options).then(res => res.json()).then(val => console.log(val))
  try {
    const response = await fetch(`${url}?query=${title}`, options)
    const data = await response.json()
    console.log('data', data)
    const results = data?.results
    if (results && Array.isArray(results) && results.length > 0) {
      const imageSize = posterSizes[2]
      const baseImageUrl = 'https://image.tmdb.org/t/p/';
      results.forEach(res => {
        // console.log('item', res)
        const posterPath = res?.poster_path || res?.backdrop_path || '';
        const obj: ISearchDataItem = {
          title: res?.title || res?.original_title || res?.original_name || '',
          fullPosterUrl: baseImageUrl + imageSize + posterPath,
          mediaType: res?.media_type || 'movie',
          releaseDate: res?.release_date || res?.first_air_date || '',
          vote: res?.vote_average || 0
        }
        resultsArr.push(obj)
      })
    } else {
      console.log('Ничего не найдено.');
    }
  } catch (e) {
    console.error('Error fetch dataInfo', e)
  }
}
