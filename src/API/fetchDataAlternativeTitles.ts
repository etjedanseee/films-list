import { MediaType } from "../types/search"

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
    console.log('altern titles', response)
  } catch (e) {
    console.error('Error fetch alternative titles:', e)
  } finally {
    setLoading(false)
  }
}