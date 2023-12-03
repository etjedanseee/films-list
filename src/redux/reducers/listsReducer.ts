import { ListsAction, ListsActionTypes, ListsState } from "../../types/lists"

const initialState: ListsState = {
  lists: [],
}

export const listsReducer = (state = initialState, action: ListsAction): ListsState => {
  switch (action.type) {
    case ListsActionTypes.SET_LISTS: {
      return {
        ...state,
        lists: action.payload
      }
    }
    default: return state
  }
}