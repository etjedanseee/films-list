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
      // console.log('lists', data)
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