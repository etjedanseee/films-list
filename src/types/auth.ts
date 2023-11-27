export interface IUser {
  id: string,
  email: string,
}

export interface AuthState {
  user: IUser | null,
}

export enum AuthActionTypes {
  SET_USER = 'SET_USER',
  SET_CHAT_LIST = 'SET_CHAT_LIST',
  SET_FRIENDS = 'SET_FRIENDS'
}

interface setUser {
  type: AuthActionTypes.SET_USER,
  payload: IUser | null
}

export type AuthAction = setUser
