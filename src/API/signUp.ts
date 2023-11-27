import supabase from "../supabaseClient"

interface signUpProps {
  email: string,
  password: string,
  setLoading: (b: boolean) => void,
  setAuthError: (error: string) => void,
}

export const signUp = async ({ email, password, setLoading, setAuthError }: signUpProps) => {
  setLoading(true)
  try {
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
    })

    if (error) {
      setAuthError('Sign up error')
      throw new Error(error.message)
    }
    // toast.success(t('successfulSignUp'))
    console.log('signUp data', data)
  } catch (e) {
    console.log('signUpError', e)
    // toast.error('SignUp error ' + e)
  } finally {
    setLoading(false)
  }
}