import { DiscoverMoviesResultsType, DiscoverSeriesResultsType, DiscoverSimilarResultsType, DiscoverTrendingResultsType } from './../types/discover';
import { MediaTypeFilterOptions } from "../types/data"

export const posterSizes = [
  "w92",
  "w154",
  "w185",
  "w342",
  "w500",
  "w780",
  "original"
]

export const baseImageUrl = 'https://image.tmdb.org/t/p/'

export const mediaTypeFilterArr: MediaTypeFilterOptions[] = [
  {
    title: 'All',
    type: 'all',
  },
  {
    title: 'Movies',
    type: "movie",
  },
  {
    title: 'Series',
    type: 'tv',
  }
]

export const trendingResultsTypeArr: DiscoverTrendingResultsType[] = ['Trending']
export const moviesResultsTypeArr: DiscoverMoviesResultsType[] = ['Popular movies', 'Now playing movies', 'Top rated movies']
export const seriesResultsTypeArr: DiscoverSeriesResultsType[] = ['Popular series', 'Top rated series']
export const similarResultsTypeArr: DiscoverSimilarResultsType[] = ['Similar']