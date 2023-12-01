import { SearchAction, SearchActionTypes, SearchState } from "../../types/search"

const initialState: SearchState = {
  loading: false,
  results: [],
}

export const searchReducer = (state = initialState, action: SearchAction): SearchState => {
  switch (action.type) {
    case SearchActionTypes.SET_LOADING: {
      return {
        ...state,
        loading: action.payload
      }
    }
    case SearchActionTypes.SET_RESULTS: {
      return {
        ...state,
        results: action.payload
      }
    }
    default: return state
  }
}