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
  title: string,
  fullPosterUrl: string,
  mediaType: MediaType,
  releaseDate: string,
  vote: number,
}