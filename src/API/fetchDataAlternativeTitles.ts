import { MediaType } from "../types/search"

interface fetchDataAlternativeTitlesResponse {
  id: number,
  titles?: {
    iso_3166_1: string,
    title: string,
  }[],
  results?: {
    iso_3166_1: string,
    title: string,
  }[],
}

interface fetchDataAlternativeTitlesProps {
  mediaType: MediaType,
  dataId: number,
  setLoading: (b: boolean) => void,
}

export const fetchDataAlternativeTitles = async ({ mediaType, dataId, setLoading }: fetchDataAlternativeTitlesProps) => {
  const url = `https://api.themoviedb.org/3/${mediaType}/${dataId}/alternative_titles`
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
    const data: fetchDataAlternativeTitlesResponse = await response.json()
    const titles: string[] = []
    const alternativeTitles = data?.titles || data?.results || []
    for (const item of alternativeTitles) {
      if (!titles.includes(item.title)) {
        titles.push(item.title)
      }
    }
    return titles
  } catch (e) {
    console.error('Error fetch alternative titles:', e)
    return []
  } finally {
    setLoading(false)
  }
}