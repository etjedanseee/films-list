import { Dispatch } from "react"
import { DataAction, DataActionTypes, IDataItemWithLinks, IInLists } from "../../types/data"
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
        notes: item.notes,
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

export const saveDataToSb = (item: IDataItemWithLinks, userId: string, setLoading: (b: boolean) => void, setId: (id: number) => void, prevData: IDataItemWithLinks[]) => {
  return async (dispatch: Dispatch<DataAction>) => {
    setLoading(true)
    const sbItem = {
      data_id: item.dataId,
      title: item.title,
      full_poster_url: item.fullPosterUrl,
      media_type: item.mediaType,
      release_date: item.releaseDate,
      vote: item.vote,
      inLists: item.inLists,
      links: item.links,
      user_id_owner: userId,
      notes: item.notes,
    }
    try {
      const { data, error } = await supabase.from('Data')
        .insert(sbItem)
        .select('*')
      if (error) {
        throw new Error(error.message)
      }
      if (data && data.length) {
        const currItem = data[0]
        setId(currItem.id)
        dispatch({
          type: DataActionTypes.SET_DATA,
          payload: [...prevData, currItem]
        })
      }
    } catch (e) {
      console.error('Error save data', e)
    } finally {
      setLoading(false)
    }
  }
}

export const updateDataInListsOnSb = (id: number, inLists: IInLists, setLoading: (b: boolean) => void, prevData: IDataItemWithLinks[]) => {
  return async (dispatch: Dispatch<DataAction>) => {
    setLoading(true)
    try {
      const { error } = await supabase.from('Data')
        .update({ inLists })
        .eq('id', id)

      if (error) {
        throw new Error(error.message)
      }
      dispatch({
        type: DataActionTypes.SET_DATA,
        payload: prevData.map(i => i.id === id ? { ...i, inLists: inLists } : i)
      })
    } catch (e) {
      console.error('Error update data inLists', e)
    } finally {
      setLoading(false)
    }
  }
}

export const deleteDataOnSb = (id: number, setLoading: (b: boolean) => void, prevData: IDataItemWithLinks[]) => {
  return async (dispatch: Dispatch<DataAction>) => {
    setLoading(true)
    try {
      const { error } = await supabase.from('Data')
        .delete()
        .eq('id', id)

      if (error) {
        throw new Error(error.message)
      }
      dispatch({
        type: DataActionTypes.SET_DATA,
        payload: prevData.filter(i => i.id !== id)
      })
    } catch (e) {
      console.error('Error delete data', e)
    } finally {
      setLoading(false)
    }
  }
}
