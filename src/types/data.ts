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
}

export type DataAction = setData

export interface IAdditionalInfoResponse {
  genres: { name: string }[],
  overview: string,
  runtime?: number,
  production_countries?: { name: string }[],
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
}