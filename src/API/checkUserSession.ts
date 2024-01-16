import supabase from "../supabaseClient"
import { IUser } from "../types/auth"

export const checkUserSession = async (setUser: (user: IUser | null) => void, setIsCheckingSession: (b: boolean) => void) => {
  try {
    const { data, error } = await supabase.auth.getSession()
    if (error) {
      throw new Error(error.message)
    }
    if (data.session) {
      const searchApiSettings = data.session.user.user_metadata?.searchApiSettings || null
      setUser({
        email: data.session.user.email || '',
        id: data.session.user.id,
        metaData: searchApiSettings ? {
          searchApiSettings: searchApiSettings,
        } : null
      })
    }
  } catch (e) {
    console.error('get session error', e)
  } finally {
    setIsCheckingSession(false)
  }
}