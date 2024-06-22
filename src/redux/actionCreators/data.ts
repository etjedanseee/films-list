import { Dispatch } from "react"
import { DataAction, DataActionTypes, IDataItemWithLinks, IInLists } from "../../types/data"
import supabase from "../../supabaseClient"
import { ILink } from "../../types/search"
import { dataItemsToSbDataItems } from "../../utils/dataItemsToSbDataItems"
import { toast } from "react-toastify"


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
    const sbItem = dataItemsToSbDataItems([item], userId)[0]
    const { id, ...sbItemWithoutId } = sbItem
    try {
      const { data, error } = await supabase.from('Data')
        .insert(sbItemWithoutId)
        .select('*')
      if (error) {
        toast.error(`Error saving ${item.title}`)
        throw new Error(error.message)
      }
      if (data && data.length) {
        const currItem = data[0] as IDataItemWithLinks
        setId(currItem.id)
        dispatch({
          type: DataActionTypes.SET_DATA,
          payload: [...prevData, { ...item, id: currItem.id }]
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
        toast.error(`Error updating data inLists`)
        throw new Error(error.message)
      }
      dispatch({
        type: DataActionTypes.SET_DATA,
        payload: prevData.map(i => i.id === id ? { ...i, inLists } : i)
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
        toast.error(`Error deleting data`)
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

export const updateDataLinksOnSb = (id: number, links: ILink[], setLoading: (b: boolean) => void, prevData: IDataItemWithLinks[]) => {
  return async (dispatch: Dispatch<DataAction>) => {
    setLoading(true)
    try {
      const { error } = await supabase.from('Data')
        .update({ links })
        .eq('id', id)

      if (error) {
        throw new Error(error.message)
      }
      dispatch({
        type: DataActionTypes.SET_DATA,
        payload: prevData.map(i => i.id === id ? { ...i, links } : i)
      })
    } catch (e) {
      console.error('Error update data links', e)
    } finally {
      setLoading(false)
    }
  }
}

export const updateDataNotesOnSb = (id: number, notes: string, setLoading: (b: boolean) => void, prevData: IDataItemWithLinks[]) => {
  return async (dispatch: Dispatch<DataAction>) => {
    setLoading(true)
    try {
      const { error } = await supabase.from('Data')
        .update({ notes })
        .eq('id', id)

      if (error) {
        throw new Error(error.message)
      }
      dispatch({
        type: DataActionTypes.SET_DATA,
        payload: prevData.map(i => i.id === id ? { ...i, notes } : i)
      })
    } catch (e) {
      console.error('Error update data notes', e)
    } finally {
      setLoading(false)
    }
  }
}
