import { Dispatch } from "redux";
import { IList, ListsAction, ListsActionTypes } from "../../types/lists";
import supabase from "../../supabaseClient";

export const setLists = (lists: IList[]) => {
  return (dispatch: Dispatch<ListsAction>) => {
    dispatch({
      type: ListsActionTypes.SET_LISTS,
      payload: lists
    })
  }
}

export const fetchLists = () => {
  return async (dispatch: Dispatch<ListsAction>) => {
    try {
      const { data, error } = await supabase.from('Lists').select('*')
      if (error) {
        throw new Error(error.message)
      }
      const lists = data?.map(item => ({
        id: item.id,
        name: item.name,
        orderNum: item.order_num,
        userIdOwner: item.user_id_owner
      })).sort((a, b) => a.orderNum - b.orderNum)

      dispatch({
        type: ListsActionTypes.SET_LISTS,
        payload: lists || []
      })
    } catch (e) {
      console.error('Error fetching lists', e)
    }
  }
}

export const updateListName = (id: number, editedName: string, setLoading: (b: boolean) => void, prevLists: IList[]) => {
  return async (dispatch: Dispatch<ListsAction>) => {
    try {
      setLoading(true)
      const { error } = await supabase.from('Lists')
        .update({ name: editedName })
        .eq('id', id)
      if (error) {
        throw new Error(error.message)
      }
      dispatch({
        type: ListsActionTypes.SET_LISTS,
        payload: prevLists.map(prevL => prevL.id === id ? { ...prevL, name: editedName } : prevL)
      })
    } catch (e) {
      console.error('Error update list name', id, e)
    } finally {
      setLoading(false)
    }
  }
}

export const updateLists = (updatedLists: IList[], setLoading: (b: boolean) => void, userId: string, prevLists: IList[]) => {
  return async (dispatch: Dispatch<ListsAction>) => {
    try {
      setLoading(true)
      const { error } = await supabase
        .from('Lists')
        .upsert(updatedLists.map(list => ({
          id: list.id,
          name: list.name,
          order_num: list.orderNum,
          user_id_owner: userId,
        })))
      if (error) {
        throw new Error(error.message)
      }
      dispatch({
        type: ListsActionTypes.SET_LISTS,
        payload: prevLists.map(list => updatedLists.find(l => l.id === list.id) || list).sort((a, b) => a.orderNum - b.orderNum)
      })
    } catch (e) {
      console.error('Error update lists', e)
    } finally {
      setLoading(false)
    }
  }
}

export const createList = (name: string, orderNum: number, userId: string, setLoading: (b: boolean) => void, prevLists: IList[]) => {
  return async (dispatch: Dispatch<ListsAction>) => {
    const list = {
      user_id_owner: userId,
      name,
      order_num: orderNum,
    }
    setLoading(true)
    try {
      const { data, error } = await supabase.from('Lists')
        .insert(list)
        .select('*')

      if (error) {
        throw new Error(error.message)
      }
      if (data && data.length) {
        const sbList = data[0]
        const currList: IList = {
          id: sbList.id,
          name,
          orderNum,
          userIdOwner: sbList.user_id_owner
        }
        dispatch({
          type: ListsActionTypes.SET_LISTS,
          payload: [...prevLists, currList]
        })
      }
    } catch (e) {
      console.error('Error insert new list', e)
    } finally {
      setLoading(false)
    }
  }
}