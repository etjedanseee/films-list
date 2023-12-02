import { Dispatch } from "redux"
import { ISearchDataItem, SearchAction, SearchActionTypes } from "../../types/search"


export const setLoading = (b: boolean) => {
  return (dispatch: Dispatch<SearchAction>) => {
    dispatch({
      type: SearchActionTypes.SET_LOADING,
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

export const setResults = (results: ISearchDataItem[]) => {
  return (dispatch: Dispatch<SearchAction>) => {
    dispatch({
      type: SearchActionTypes.SET_RESULTS,
      payload: results
    })
  }
}
