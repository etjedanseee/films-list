import AuthPage from "../pages/AuthPage"
import Lists from "../pages/Lists"
import SearchResults from "../pages/SearchResults"
import Settings from "../pages/Settings"
import { IRoute } from "../types/route"
import DataItem from "../pages/DataItem"

//userPanel with sites and signOut, lists, listItem, searchItems, searchDataItem
export const publicRoutes: IRoute[] = [
  { path: '/auth', element: <AuthPage /> },
]

export const privateRoutes: IRoute[] = [
  { path: '/', element: <Lists /> },
  { path: '/settings', element: <Settings /> },
  { path: '/search/:search', element: <SearchResults /> },
  { path: '/data/:id', element: <DataItem /> },
]