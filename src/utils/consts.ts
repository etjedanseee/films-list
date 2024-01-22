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