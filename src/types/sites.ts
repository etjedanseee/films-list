
export interface SitesState {
  sites: string[]
}

export enum SitesActionTypes {
  SET_SITES = 'SET_SITES',
}

interface setSites {
  type: SitesActionTypes.SET_SITES,
  payload: string[]
}

export type SitesAction = setSites