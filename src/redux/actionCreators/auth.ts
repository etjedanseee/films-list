import { Dispatch } from "redux"
import { AuthAction, AuthActionTypes, IUser, IUserMetadata } from "../../types/auth"
import supabase from "../../supabaseClient"

export const setUser = (user: IUser | null) => {
  return (dispatch: Dispatch<AuthAction>) => {
    dispatch({
      type: AuthActionTypes.SET_USER,
      payload: user
    })
  }
}

export const updateUserMetadata = (user: IUser, userMetadata: IUserMetadata) => {
  const updatedUser = { ...user, metaData: userMetadata }
  return async (dispatch: Dispatch<AuthAction>) => {
    try {
      const { error } = await supabase.auth.updateUser({ data: userMetadata })

      if (error) {
        throw new Error(error.message)
      }

      dispatch({ type: AuthActionTypes.SET_USER, payload: updatedUser })
    } catch (e) {
      console.error('updateUserMetadata error', e)
    }
  }
}