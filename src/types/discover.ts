import { IPreviewDataItem } from "./search";

export interface DiscoverState {
  loading: boolean,
  results: IPreviewDataItem[],
  resultsType: DiscoverResultsType,
  page: number,
  totalPages: number,
  type: DiscoverType,
}

export enum DiscoverActionTypes {
  SET_DISCOVER_LOADING = 'SET_DISCOVER_LOADING',
  SET_DISCOVER_RESULTS = 'SET_DISCOVER_RESULTS',
  SET_DISCOVER_RESULTS_TYPE = 'SET_DISCOVER_RESULTS_TYPE',
  SET_DISCOVER_TOTAL_PAGES = 'SET_DISCOVER_TOTAL_PAGES',
  SET_DISCOVER_PAGE = 'SET_DISCOVER_PAGE',
  SET_DISCOVER_TYPE = 'SET_DISCOVER_TYPE',
}

interface setLoading {
  type: DiscoverActionTypes.SET_DISCOVER_LOADING,
  payload: boolean,
}

interface setResults {
  type: DiscoverActionTypes.SET_DISCOVER_RESULTS,
  payload: {
    results: IPreviewDataItem[],
    resultsType: DiscoverResultsType,
  }
}

interface setPage {
  type: DiscoverActionTypes.SET_DISCOVER_PAGE,
  payload: number,
}

interface setTotalPages {
  type: DiscoverActionTypes.SET_DISCOVER_TOTAL_PAGES,
  payload: number,
}

interface setType {
  type: DiscoverActionTypes.SET_DISCOVER_TYPE,
  payload: DiscoverType,
}

interface setResultsType {
  type: DiscoverActionTypes.SET_DISCOVER_RESULTS_TYPE,
  payload: DiscoverResultsType,
}

export type DiscoverAction = setLoading | setResults | setTotalPages | setPage | setType | setResultsType

export type DiscoverType = 'trending' | 'movies' | 'series' | 'similar'
export type DiscoverResultsType = DiscoverTrendingResultsType | DiscoverMoviesResultsType | DiscoverSeriesResultsType | DiscoverSimilarResultsType
export type DiscoverTrendingResultsType = 'Trending'
export type DiscoverMoviesResultsType = 'Now playing movies' | 'Popular movies' | 'Top rated movies'
export type DiscoverSeriesResultsType = 'Popular series' | 'Top rated series'
export type DiscoverSimilarResultsType = 'Similar'

export interface IFetchDiscoverDataResponse {
  page: number,
  results: any[],
  total_pages: number,
}