import { ILink, IPreviewDataItem, MediaType } from "./search";

//[list id]: Date
export interface IInLists {
  [id: number]: string,
}

export interface IDataItemWithLinks extends IPreviewDataItem {
  id: number,
  inLists: IInLists,
  links: ILink[],
  notes: string,
}

export interface DataState {
  data: IDataItemWithLinks[],
}

export enum DataActionTypes {
  SET_DATA = 'SET_DATA',
}

interface setData {
  type: DataActionTypes.SET_DATA,
  payload: IDataItemWithLinks[],
}

export interface IDataAdditionalInfo {
  genres: string[],
  overview: string,
  runtime: number,
  countries: string[],
  tagline: string,
  belongsToCollection?: {
    id: number,
    name: string,
  }
}

export type DataAction = setData

export interface IAdditionalInfoResponse {
  genres: { name: string }[],
  overview: string,
  runtime?: number,
  production_countries?: { name: string }[],
  tagline?: string,
  belongs_to_collection?: {
    id: number,
    name: string,
  }
}

export interface IPreviewDataWithAddInfoResponse extends IAdditionalInfoResponse {
  name?: string,
  title?: string,
  original_title?: string,
  original_name?: string,
  poster_path?: string,
  backdrop_path?: string,
  media_type?: MediaType,
  release_date?: string,
  first_air_date?: string,
  vote_average?: number,
  number_of_seasons?: number,
}

export type MediaTypeFilterTitle = 'All' | 'Movies' | 'Series'
export interface MediaTypeFilterOptions {
  title: MediaTypeFilterTitle,
  type: MediaType
}

export interface ICollection {
  id: number,
  name: string,
  parts: IPreviewDataItem[],
}

export interface IFetchCollectionResponse {
  id: number,
  name: string,
  parts: {
    id: number,
    title: string,
    release_date?: string,
    poster_path?: string,
    backdrop_path?: string,
    vote_average: number,
  }[],
}
