import { SearchAction, SearchActionTypes, SearchState } from "../../types/search"

const initialState: SearchState = {
  loading: false,
  results: [],
  lastSearch: '',
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
      localStorage.setItem('searchResults', JSON.stringify(action.payload))
      return {
        ...state,
        results: action.payload
      }
    }
    case SearchActionTypes.SET_LAST_SEARCH: {
      localStorage.setItem('lastSearch', action.payload)
      return {
        ...state,
        lastSearch: action.payload
      }
    }
    default: return state
  }
}