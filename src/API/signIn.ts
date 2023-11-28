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
      email: email?.trim(),
      password: password?.trim(),
    })
    // console.log('singIn data', data)
    if (error) {
      toast.error('Wrong email or password')
      throw new Error(error.message)
    }

    if (data && data.user) {
      setUser({
        id: data.user.id,
        email: data.user.email || ''
      })
    }
    navigate('/')
  } catch (e) {
    console.log('singIn error', e)
  } finally {
    setLoading(false)
  }
}