import { IDataAdditionalInfo } from "../types/data"
import { MediaType } from "../types/search"

interface ISearchDataInfo {
  dataId: number,
  mediaType: MediaType,
  setLoading: (b: boolean) => void,
  setAdditionalInfo: (info: IDataAdditionalInfo | null) => void
}

interface IAdditionalInfoResponse {
  genres: { name: string }[],
  overview: string,
  runtime?: number,
}

export const fetchDataAdditionalInfo = async ({ dataId, mediaType, setLoading, setAdditionalInfo }: ISearchDataInfo) => {
  const url = 'https://api.themoviedb.org/3'
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
    const response = await fetch(`${url}/${mediaType}/${dataId}`, options)
    const data: IAdditionalInfoResponse = await response.json()
    const result = data.genres.map(genre => genre.name)
    setAdditionalInfo({
      genres: result,
      overview: data.overview,
      runtime: data?.runtime ?? 0,
    })
  } catch (e) {
    console.error('Error fetch dataInfo', e)
  } finally {
    setLoading(false)
  }
}