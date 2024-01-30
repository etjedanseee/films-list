import { DiscoverAction, DiscoverActionTypes, DiscoverState } from "../../types/discover"

const initialState: DiscoverState = {
  type: "trending",
  loading: false,
  results: [],
  resultsType: 'Trending',
  page: 1,
  totalPages: 0,
}

export const discoverReducer = (state = initialState, action: DiscoverAction): DiscoverState => {
  switch (action.type) {
    case DiscoverActionTypes.SET_DISCOVER_LOADING: {
      return {
        ...state,
        loading: action.payload
      }
    }
    case DiscoverActionTypes.SET_DISCOVER_RESULTS: {
      return {
        ...state,
        results: action.payload.results,
        resultsType: action.payload.resultsType,
      }
    }
    case DiscoverActionTypes.SET_DISCOVER_PAGE: {
      return {
        ...state,
        page: action.payload
      }
    }
    case DiscoverActionTypes.SET_DISCOVER_TOTAL_PAGES: {
      return {
        ...state,
        totalPages: action.payload > 500 ? 500 : action.payload
      }
    }
    case DiscoverActionTypes.SET_DISCOVER_TYPE: {
      if (state.type !== action.payload) {
        return {
          ...state,
          results: [],
          page: 1,
          totalPages: 0,
          type: action.payload,
        }
      } else return state
    }
    case DiscoverActionTypes.SET_DISCOVER_RESULTS_TYPE: {
      return {
        ...state,
        results: [],
        page: 1,
        totalPages: 0,
        resultsType: action.payload,
      }
    }
    default: return state
  }
}