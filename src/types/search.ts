interface ISearchSiteItem {
  displayLink: string,
  link: string,
  title: string,
}

export interface ISearchDataOnSites {
  items?: ISearchSiteItem[],
  searchInformation: {
    totalResults: number
  }
}

export interface IFoundLink {
  title: string,
  link: string,
}

export interface ILink {
  site: string,
  result: IFoundLink | null,
}

export type MediaType = 'movie' | 'tv'

export interface ISearchDataItem {
  dataId: number,
  title: string,
  fullPosterUrl: string,
  mediaType: MediaType,
  releaseDate: string,
  vote: number,
}

export interface SearchState {
  results: ISearchDataItem[],
  loading: boolean,
  lastSearch: string,
}

export interface ISearchDataOnSitesResponse {
  items?: {
    displayLink: string,
    link: string,
    snippet: string,
    title: string,
  }[],
}

export enum SearchActionTypes {
  SET_RESULTS = 'SET_RESULTS',
  SET_LOADING = 'SET_LOADING',
  SET_LAST_SEARCH = 'SET_LAST_SEARCH',
}

interface setResults {
  type: SearchActionTypes.SET_RESULTS,
  payload: ISearchDataItem[],
}

interface setLoading {
  type: SearchActionTypes.SET_LOADING,
  payload: boolean,
}

interface setLastSearch {
  type: SearchActionTypes.SET_LAST_SEARCH,
  payload: string,
}

export type SearchAction = setResults | setLoading | setLastSearch