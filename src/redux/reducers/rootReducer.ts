import { combineReducers } from "redux";
import { authReducer } from './authReducer'
import { listsReducer } from './listsReducer'
import { sitesReducer } from './sitesReducer'
import { searchReducer } from './searchReducer'

export const rootReducer = combineReducers({
  auth: authReducer,
  lists: listsReducer,
  sites: sitesReducer,
  search: searchReducer,
})

export type RootState = ReturnType<typeof rootReducer>