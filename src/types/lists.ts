import { UUID } from "crypto"

export interface IList {
  id: number,
  userIdOwner: UUID,
  name: string,
  orderNum: number,
}
export interface ListsState {
  lists: IList[]
}

export enum ListsActionTypes {
  SET_LISTS = 'SET_LISTS',
}

interface setLists {
  type: ListsActionTypes.SET_LISTS,
  payload: IList[]
}

export interface ICountDataInLists {
  [listId: number]: number,
}

export type ListsAction = setLists