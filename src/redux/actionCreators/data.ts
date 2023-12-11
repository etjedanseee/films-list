import { Dispatch } from "react"
import { DataAction, DataActionTypes, IDataItemWithLinks } from "../../types/data"
import supabase from "../../supabaseClient"


export const setData = (data: IDataItemWithLinks[]) => {
  return (dispatch: Dispatch<DataAction>) => {
    dispatch({
      type: DataActionTypes.SET_DATA,
      payload: data
    })
  }
}

export const fetchData = () => {
  return async (dispatch: Dispatch<DataAction>) => {
    try {
      const { data, error } = await supabase.from('Data').select('*')
      if (error) {
        throw new Error(error.message)
      }
      const dataArr: IDataItemWithLinks[] = data.map(item => ({
        id: item.id,
        dataId: item.data_id,
        inLists: item.inLists,
        title: item.title,
        fullPosterUrl: item.full_poster_url,
        mediaType: item.media_type,
        releaseDate: item.release_date,
        vote: item.vote,
        links: item.links,
      }))

      dispatch({
        type: DataActionTypes.SET_DATA,
        payload: dataArr || []
      })
    } catch (e) {
      console.error('Error fetching data', e)
    }
  }
}