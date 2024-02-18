import { IDataTrailer } from "../types/data";
import { MediaType } from "../types/search";

interface fetchDataTrailerResponse {
  id: number,
  results?: {
    name: string,
    key: string,
    site: string,
    type: string,
    published_at: string,
  }[],
}

interface fetchDataTrailerProps {
  mediaType: MediaType,
  dataId: number,
  setLoading: (b: boolean) => void,
  setTrailer: (trailer: IDataTrailer | null) => void,
}

export const fetchDataTrailer = async ({ dataId, mediaType, setLoading, setTrailer }: fetchDataTrailerProps) => {
  const url = 'https://api.themoviedb.org/3/'
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
    const response = await fetch(`${url}/${mediaType}/${dataId}/videos`, options)
    if (response.status !== 200) {
      throw new Error('Error:' + response.status)
    }
    const data: fetchDataTrailerResponse = await response.json()
    if (data?.results && data.results.length) {
      const trailers = data.results.filter(res => res.type === 'Trailer')
      const trailer = trailers[trailers.length - 1]
      setTrailer({
        key: trailer.key,
        name: trailer.name,
        publishedAt: trailer.published_at,
        site: trailer.site,
      })
    }
  } catch (e) {
    console.error(`Error fetch data ${dataId} trailer: ${e}`)
  } finally {
    setLoading(false)
  }
}