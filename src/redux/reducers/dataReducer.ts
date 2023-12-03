import { DataAction, DataActionTypes, DataState } from "../../types/data"

const initialState: DataState = {
  data: [],
}

export const dataReducer = (state = initialState, action: DataAction): DataState => {
  switch (action.type) {
    case DataActionTypes.SET_DATA: {
      return {
        ...state,
        data: action.payload
      }
    }
    default: return state
  }
}