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

      dispatch({
        type: SitesActionTypes.SET_SITES,
        payload: data[0].sites || []
      })
    } catch (e) {
      console.error('Error fetching sites', e)
    }
  }
}

export const updateUserSites = (userId: string, updatedSites: string[], setLoading: (b: boolean) => void) => {
  return async (dispatch: Dispatch<SitesAction>) => {
    setLoading(true)
    try {
      const { error } = await supabase
        .from('UserSearchSites')
        .update({ sites: updatedSites })
        .eq('user_id_owner', userId)

      if (error) {
        throw new Error(error.message)
      }
      dispatch({
        type: SitesActionTypes.SET_SITES,
        payload: updatedSites
      })
    } catch (e) {
      console.error('Error update sites', e)
    } finally {
      setLoading(false)
    }
  }
}