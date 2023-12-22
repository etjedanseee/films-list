import { Dispatch } from "redux";
import supabase from "../supabaseClient";
import { AuthAction, IUser } from "../types/auth";
import { toast } from 'react-toastify'
interface signInProps {
  email: string,
  password: string,
  setLoading: (b: boolean) => void,
  setUser: (user: IUser | null) => (dispatch: Dispatch<AuthAction>) => void,
  navigate: (s: string) => void
}

export const signIn = async ({ email, password, setLoading, navigate, setUser }: signInProps) => {
  setLoading(true)
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: password.trim(),
    })
    if (error) {
      toast.error('Wrong email or password')
      throw new Error(error.message)
    }

    if (data && data.user) {
      const searchApiSettings = data.user.user_metadata?.searchApiSettings || null
      setUser({
        id: data.user.id,
        email: data.user.email || '',
        metaData: { searchApiSettings },
      })
    }
    navigate('/')
  } catch (e) {
    console.error('singIn error', e)
  } finally {
    setLoading(false)
  }
}