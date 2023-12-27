import React, { useState, ChangeEvent, useEffect, FormEvent } from 'react'
import { isValidEmail } from '../utils/isValidEmail'
import Input from '../UI/Input'
import Button from '../UI/Button'

interface AuthFormProps {
  setUserEmail: (data: string) => void,
  userEmail: string,
  isFormValid: boolean,
  setIsAuthFormValid: (bool: boolean) => void,
  setUserPassword: (data: string) => void,
  userPassword: string,
  isSignIn: boolean,
  setIsSignIn: (b: boolean) => void,
  onAuthFormSubmit: () => void,
}

const AuthForm = ({ setIsAuthFormValid, setUserEmail, isFormValid, setUserPassword, userEmail, userPassword, isSignIn, setIsSignIn, onAuthFormSubmit }: AuthFormProps) => {
  const [email, setEmail] = useState(userEmail || '')
  const [emailError, setEmailError] = useState('')
  const [isEmailDirty, setIsEmailDirty] = useState(false)

  const [password, setPassword] = useState(userPassword || '')
  const [passwordError, setPasswordError] = useState('')
  const [isPasswordDirty, setIsPasswordDirty] = useState(false)

  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const email = value.trim()
    if (!email.length) {
      setEmailError('Field is required')
    } else if (isValidEmail(email)) {
      setEmailError('')
    } else {
      setEmailError('Enter correct email')
    }
    setEmail(value)
  }

  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const password = value.trim()
    if (!password.length) {
      setPasswordError('Field is required')
    } else if (password.length < 6) {
      setPasswordError('Password must be longer than 6 characters')
    } else {
      setPasswordError('')
    }
    setPassword(value)
  }

  const onSignChange = () => {
    setIsSignIn(!isSignIn)
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onAuthFormSubmit()
  }

  useEffect(() => {
    if (email.length) {
      setIsEmailDirty(true)
    }
  }, [email])

  useEffect(() => {
    if (password.length) {
      setIsPasswordDirty(true)
    }
  }, [password])

  useEffect(() => {
    if (!emailError && !passwordError && isEmailDirty && isPasswordDirty) {
      setIsAuthFormValid(true)
      setUserEmail(email)
      setUserPassword(password)
    } else {
      setIsAuthFormValid(false)
    }
  }, [emailError, email, setIsAuthFormValid, setUserEmail, passwordError, setUserPassword, password, isEmailDirty, isPasswordDirty])

  return (
    <div className='minw-[260px] max-w-sm w-full'>
      <form onSubmit={onSubmit}>
        <Input
          onInputChange={onEmailChange}
          placeholder='Enter your email'
          value={email}
          autoCompleteValue='email'
          error={emailError}
          isFieldDirty={isEmailDirty}
          name='Email'
          className='mb-4'
          type='email'
        />
        <Input
          onInputChange={onPasswordChange}
          placeholder='Enter your password'
          value={password}
          autoCompleteValue={isSignIn ? 'current-password' : 'new-password'}
          error={passwordError}
          isFieldDirty={isPasswordDirty}
          name='Password'
          isPassword={true}
          className='mb-4'
        />
        <Button
          title={isSignIn ? 'Sign in' : 'Sign up'}
          onClick={() => { }}
          disabled={!isFormValid}
          type='submit'
        />
        <button
          type='button'
          className='mt-2 text-sm underline'
          onClick={onSignChange}
        >
          {isSignIn ? 'Don\'t have an account? Sign Up' : 'Already have an account? Sign in'}
        </button>
      </form>
    </div>
  )
}

export default AuthForm