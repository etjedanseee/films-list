import { Dispatch } from "redux"
import { AuthAction, AuthActionTypes, IUser } from "../../types/auth"

export const setUser = (user: IUser | null) => {
  return (dispatch: Dispatch<AuthAction>) => {
    dispatch({
      type: AuthActionTypes.SET_USER,
      payload: user
    })
  }
}