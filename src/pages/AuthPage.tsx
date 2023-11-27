import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthForm from '../components/AuthForm'
import { signIn } from '../API/signIn'
import { signUp } from '../API/signUp'
import { useActions } from '../hooks/useActions'

const AuthPage = () => {
  const navigate = useNavigate()
  const { setUser } = useActions()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isFormValid, setIsFormValid] = useState(false)
  const [isSignIn, setIsSignIn] = useState(true)
  const [loading, setLoading] = useState(false)
  const [authError, setAuthError] = useState('')

  const onAuthFormSubmit = () => {
    console.log('onSubmit', email, password)
    if (!isFormValid) {
      return;
    }
    if (isSignIn) {
      console.log('signIn')
      signIn({
        email,
        password,
        setLoading,
        setAuthError,
        setUser,
        navigate,
      })
    } else {
      console.log('signUp')
      signUp({
        email,
        password,
        setLoading,
        setAuthError
      })
    }
  }

  if (loading) {
    return <div className='text-4xl text-red-500'>Loading...</div>
  }

  return (
    <div>
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
        authError={authError}
        setAuthError={setAuthError}
      />
    </div>
  )
}

export default AuthPage