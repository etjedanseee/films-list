import { ILink, IPreviewDataItem } from "./search";

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