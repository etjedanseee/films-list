interface ISearchDataItem {
  displayLink: string,
  link: string,
  title: string,
}

export interface ISearchDataOnSites {
  items?: ISearchDataItem[],
  searchInformation: {
    totalResults: number
  }
}
export interface ILink {
  site: string,
  title: string,
  link: string,
}