import { Dispatch } from "redux";
import { SitesAction, SitesActionTypes } from "../../types/sites";
import supabase from "../../supabaseClient";

export const setSites = (sites: string[]) => {
  return (dispatch: Dispatch<SitesAction>) => {
    dispatch({
      type: SitesActionTypes.SET_SITES,
      payload: sites
    })
  }
}

export const fetchSites = () => {
  return async (dispatch: Dispatch<SitesAction>) => {
    try {
      const { data, error } = await supabase.from('UserSearchSites').select('*')
      if (error) {
        throw new Error(error.message)
      }
      // console.log('sites', data)

      dispatch({
        type: SitesActionTypes.SET_SITES,
        payload: data[0].sites || []
      })
    } catch (e) {
      console.error('Error fetching lists', e)
    }
  }
}