import { Dispatch } from "redux"
import { IPreviewDataItem, SearchAction, SearchActionTypes } from "../../types/search"


export const setSearchLoading = (b: boolean) => {
  return (dispatch: Dispatch<SearchAction>) => {
    dispatch({
      type: SearchActionTypes.SET_SEARCH_LOADING,
      payload: b
    })
  }
}

export const setLastSearch = (search: string) => {
  return (dispatch: Dispatch<SearchAction>) => {
    dispatch({
      type: SearchActionTypes.SET_LAST_SEARCH,
      payload: search
    })
  }
}

export const setSearchResults = (results: IPreviewDataItem[], page: number) => {
  return (dispatch: Dispatch<SearchAction>) => {
    dispatch({
      type: SearchActionTypes.SET_SEARCH_RESULTS,
      payload: {
        results,
        page,
      }
    })
  }
}

export const setSearchPage = (page: number) => {
  return (dispatch: Dispatch<SearchAction>) => {
    dispatch({
      type: SearchActionTypes.SET_SEARCH_PAGE,
      payload: page
    })
  }
}

export const setSearchTotalPages = (totalPages: number) => {
  return (dispatch: Dispatch<SearchAction>) => {
    dispatch({
      type: SearchActionTypes.SET_SEARCH_TOTAL_PAGES,
      payload: totalPages
    })
  }
}
