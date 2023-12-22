
export interface IUser {
  id: string,
  email: string,
  metaData: IUserMetadata | null,
}

export interface IUserMetadata {
  searchApiSettings: IUserSearchApiSettings,
}

export interface IUserSearchApiSettings {
  searchApiKey: string,
  searchEngineId: string,
}

export interface AuthState {
  user: IUser | null,
}

export enum AuthActionTypes {
  SET_USER = 'SET_USER',
}

interface setUser {
  type: AuthActionTypes.SET_USER,
  payload: IUser | null
}

export type AuthAction = setUser
