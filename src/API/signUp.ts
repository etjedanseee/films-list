import supabase from "../supabaseClient"
import { toast } from 'react-toastify'

interface signUpProps {
  email: string,
  password: string,
  setLoading: (b: boolean) => void,
}

export const signUp = async ({ email, password, setLoading }: signUpProps) => {
  setLoading(true)
  try {
    const { error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
    })

    if (error) {
      toast.error('Sign up error')
      throw new Error(error.message)
    }
    toast.info('Please confirm email letter', { autoClose: 5000 })
    // console.log('signUp data', data)
  } catch (e) {
    console.log('signUpError', e)
    toast.error('SignUp error ' + e)
  } finally {
    setLoading(false)
  }
}