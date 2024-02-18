import { IAdditionalInfoResponse, IDataAdditionalInfo } from "../types/data"
import { MediaType } from "../types/search"
import { calcEstimatedSeriesTime } from "../utils/calcEstimatedSeriesTime"

interface ISearchDataInfo {
  dataId: number,
  mediaType: MediaType,
  setLoading: (b: boolean) => void,
  setAdditionalInfo: (info: IDataAdditionalInfo | null) => void
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
    const genres = data.genres.map(genre => genre.name)
    const belongsToCollectionId = data?.belongs_to_collection?.id
    const episodeRunTime = data?.episode_run_time
    const episodesCount = data?.number_of_episodes
    const estimatedTime = (!!episodeRunTime?.length && episodesCount)
      ? calcEstimatedSeriesTime(episodesCount, episodeRunTime)
      : 0
    setAdditionalInfo({
      genres,
      overview: data?.overview,
      runtime: data?.runtime ?? 0,
      countries: data?.production_countries?.map(country => country.name) || [],
      tagline: data?.tagline || '',
      belongsToCollection: belongsToCollectionId !== undefined ? ({
        id: belongsToCollectionId,
        name: data?.belongs_to_collection?.name || '',
      })
        : undefined,
      originalTitle: data?.original_title || data?.original_name || '',
      status: data?.status || '?',
      estimatedTime,
    })
  } catch (e) {
    console.error('Error fetch dataInfo', e)
  } finally {
    setLoading(false)
  }
}