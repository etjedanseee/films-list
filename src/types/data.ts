import { ILink, ISearchDataItem } from "./search";

export interface IInLists {
  id: number,
  date: string,
}

export interface IDataItemWithLinks extends ISearchDataItem {
  id: number,
  inLists: IInLists[],
  links: ILink[],
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
}

export type DataAction = setData