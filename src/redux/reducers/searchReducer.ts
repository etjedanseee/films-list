import { SearchAction, SearchActionTypes, SearchState } from "../../types/search"

const initialState: SearchState = {
  loading: false,
  results: [],
  lastSearch: '',
  page: 1,
  totalPages: 0,
}

export const searchReducer = (state = initialState, action: SearchAction): SearchState => {
  switch (action.type) {
    case SearchActionTypes.SET_SEARCH_LOADING: {
      return {
        ...state,
        loading: action.payload
      }
    }
    case SearchActionTypes.SET_SEARCH_RESULTS: {
      const results = action.payload.results
      const filteredResults = action.payload.page === 1
        ? results
        : [
          ...state.results,
          ...results.filter(res => !state.results.find(prevRes => prevRes.dataId === res.dataId && prevRes.fullPosterUrl === res.fullPosterUrl))
        ]
      localStorage.setItem('searchResults', JSON.stringify(filteredResults))
      return {
        ...state,
        results: filteredResults,
      }
    }
    case SearchActionTypes.SET_LAST_SEARCH: {
      localStorage.setItem('lastSearch', action.payload)
      return {
        ...state,
        lastSearch: action.payload
      }
    }
    case SearchActionTypes.SET_SEARCH_PAGE: {
      localStorage.setItem('page', action.payload.toString())
      return {
        ...state,
        page: action.payload
      }
    }
    case SearchActionTypes.SET_SEARCH_TOTAL_PAGES: {
      localStorage.setItem('totalPages', action.payload.toString())
      return {
        ...state,
        totalPages: action.payload
      }
    }
    default: return state
  }
}