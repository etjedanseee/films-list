import { SitesAction, SitesActionTypes, SitesState } from './../../types/sites';

const initialState: SitesState = {
  sites: []
}

export const sitesReducer = (state = initialState, action: SitesAction): SitesState => {
  switch (action.type) {
    case SitesActionTypes.SET_SITES: {
      return {
        ...state,
        sites: action.payload
      }
    }
    default: return state
  }
}