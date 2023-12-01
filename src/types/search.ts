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

export interface ILink {
  site: string,
  title: string,
  link: string,
}

export type MediaType = 'movie' | 'tv'

export interface ISearchDataItem {
  id: number,
  title: string,
  fullPosterUrl: string,
  mediaType: MediaType,
  releaseDate: string,
  vote: number,
}
//rewrite
export interface IDataItemWithLinks extends ISearchDataItem {
  links: string[]
}
export interface SearchState {
  results: ISearchDataItem[],
  loading: boolean,
}

export enum SearchActionTypes {
  SET_RESULTS = 'SET_RESULTS',
  SET_LOADING = 'SET_LOADING',
}

interface setResults {
  type: SearchActionTypes.SET_RESULTS,
  payload: ISearchDataItem[]
}

interface setLoading {
  type: SearchActionTypes.SET_LOADING,
  payload: boolean
}

export type SearchAction = setResults | setLoading