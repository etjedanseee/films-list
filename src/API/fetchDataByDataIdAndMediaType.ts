import { IPreviewDataItem } from "../types/search";
import { IDataAdditionalInfo, IPreviewDataWithAddInfoResponse } from "../types/data";
import { baseImageUrl, posterSizes } from "../utils/consts";

interface fetchDataByDataIdAndMediaTypeProps {
  id: number,
  mediaType: string,
  setItem: (item: IPreviewDataItem | null) => void,
  setAdditionalInfo: (addInfo: IDataAdditionalInfo) => void,
}

export const fetchDataByDataIdAndMediaType = async ({ id, mediaType, setAdditionalInfo, setItem }: fetchDataByDataIdAndMediaTypeProps) => {
  const url = 'https://api.themoviedb.org/3'
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
  try {
    const response = await fetch(`${url}/${mediaType}/${id}`, options)
    if (response.status !== 200) {
      throw new Error('Error:' + response.status)
    }
    const data: IPreviewDataWithAddInfoResponse = await response.json()
    const result = data.genres.map(genre => genre.name)
    setAdditionalInfo({
      genres: result,
      overview: data?.overview,
      runtime: data?.runtime ?? 0,
      countries: data?.production_countries?.map(country => country.name) || [],
    })
    const imageSize = posterSizes[2]
    const posterPath = data?.poster_path || data?.backdrop_path || '';
    const obj: IPreviewDataItem = {
      dataId: id,
      title: data?.name || data?.title || data?.original_title || data?.original_name || '',
      fullPosterUrl: posterPath ? baseImageUrl + imageSize + posterPath : '',
      mediaType: data?.media_type || 'movie',
      releaseDate: data?.release_date || data?.first_air_date || '',
      vote: data?.vote_average || 0,
    };
    setItem(obj)
  } catch (e) {
    console.error('Error fetch data by dataId and mediaType', e)
  }
}