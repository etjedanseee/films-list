import AuthPage from "../pages/AuthPage"
import Lists from "../pages/Lists"
import SearchResults from "../pages/SearchResults"
import Settings from "../pages/Settings"
import { IRoute } from "../types/route"
import DataItem from "../pages/DataItem"
import { Navigate } from "react-router-dom"
import NotFoundPage from "../pages/NotFoundPage"

export const publicRoutes: IRoute[] = [
  { path: '/auth', element: <AuthPage /> },
  { path: '*', element: <Navigate to={'/auth'} replace={true} /> }
]

export const privateRoutes: IRoute[] = [
  { path: '/', element: <Lists /> },
  { path: '/settings', element: <Settings /> },
  { path: '/search/:search', element: <SearchResults /> },
  { path: '/data/:mediaType/:id', element: <DataItem /> },
  { path: '*', element: <NotFoundPage /> },
]