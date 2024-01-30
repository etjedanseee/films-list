import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthForm from '../components/AuthForm'
import { signIn } from '../API/signIn'
import { signUp } from '../API/signUp'
import { useActions } from '../hooks/useActions'
import Loader from '../UI/Loader'
import { ReactComponent as LogoIcon } from '../assets/logo.svg'

const AuthPage = () => {
  const navigate = useNavigate()
  const { setUser } = useActions()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isFormValid, setIsFormValid] = useState(false)
  const [isSignIn, setIsSignIn] = useState(true)
  const [loading, setLoading] = useState(false)

  const onAuthFormSubmit = () => {
    if (!isFormValid) {
      return;
    }
    if (isSignIn) {
      signIn({
        email,
        password,
        setLoading,
        setUser,
        navigate,
      })
    } else {
      signUp({
        email,
        password,
        setLoading,
      })
      setIsSignIn(true)
    }
  }

  useEffect(() => {
    document.title = `Auth - Films Lists`
  }, [])

  if (loading) {
    return (
      <div className='flex-1 flex justify-center items-center'><Loader size='80' /></div>
    )
  }

  return (
    <div className='flex-1 flex flex-col justify-center items-center'>
      <div className='flex items-center gap-x-4 mb-4'>
        <LogoIcon className='h-16 w-16' />
        <div className='font-bold text-4xl'>Films Lists</div>
      </div>
      <AuthForm
        setIsAuthFormValid={setIsFormValid}
        isFormValid={isFormValid}
        setUserEmail={setEmail}
        setUserPassword={setPassword}
        userEmail={email}
        userPassword={password}
        isSignIn={isSignIn}
        setIsSignIn={setIsSignIn}
        onAuthFormSubmit={onAuthFormSubmit}
      />
    </div>
  )
}

export default AuthPage