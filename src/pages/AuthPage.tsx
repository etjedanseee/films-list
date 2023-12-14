import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthForm from '../components/AuthForm'
import { signIn } from '../API/signIn'
import { signUp } from '../API/signUp'
import { useActions } from '../hooks/useActions'
import Loader from '../UI/Loader'

const AuthPage = () => {
  const navigate = useNavigate()
  const { setUser } = useActions()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isFormValid, setIsFormValid] = useState(false)
  const [isSignIn, setIsSignIn] = useState(false)
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

  if (loading) {
    return (
      <div className='flex-1 flex justify-center items-center'><Loader size='20' /></div>
    )
  }

  return (
    <>
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
    </>
  )
}

export default AuthPage