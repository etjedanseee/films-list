import React, { useState, ChangeEvent, useEffect, FormEvent } from 'react'
import { isValidEmail } from '../utils/isValidEmail'
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Button, FormHelperText, Box, Link } from '@mui/material'
import { VisibilityOff, Visibility } from '@mui/icons-material'

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
  authError: string,
  setAuthError: (e: string) => void
}

const AuthForm = ({ setIsAuthFormValid, setUserEmail, isFormValid, setUserPassword, userEmail, userPassword, isSignIn, setIsSignIn, onAuthFormSubmit, authError, setAuthError }: AuthFormProps) => {
  const [email, setEmail] = useState(userEmail || '')
  const [emailError, setEmailError] = useState(userEmail.length ? '' : '')
  const [isEmailDirty, setIsEmailDirty] = useState(false)

  const [password, setPassword] = useState(userPassword || '')
  const [passwordError, setPasswordError] = useState(userPassword.length ? '' : '')
  const [isPasswordDirty, setIsPasswordDirty] = useState(false)
  const [showPassword, setShowPassword] = useState(false);

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
    setAuthError('')
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
    setAuthError('')
  }

  const handleClickShowPassword = () => {
    setShowPassword(show => !show);
  }

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  }

  const onSignChange = () => {
    setIsSignIn(!isSignIn)
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isFormValid) {
      setEmailError('Field is required')
      setPasswordError('Field is required')
      setIsEmailDirty(true)
      setIsPasswordDirty(true)
    }
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
    <div className='py-10 w-1/3 m-auto text-white'>
      <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          label='Email'
          variant="outlined"
          required
          type='email'
          error={!!emailError && isEmailDirty}
          helperText={!!emailError && isEmailDirty && emailError}
          placeholder="Enter your email"
          value={email}
          onChange={onEmailChange}
          autoFocus
          fullWidth
        />
        <FormControl fullWidth margin='normal'>
          <InputLabel
            htmlFor='outlined-adornment-password'
            error={!!passwordError && isPasswordDirty}
            required
          >
            Password
          </InputLabel>
          <OutlinedInput
            label='Password'
            value={password}
            onChange={onPasswordChange}
            id='outlined-adornment-password'
            type={showPassword ? 'text' : 'password'}
            error={!!passwordError && isPasswordDirty}
            placeholder="Enter your password"
            autoComplete={isSignIn ? 'current-password' : 'new-password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          {passwordError && isPasswordDirty && <FormHelperText error>{passwordError}</FormHelperText>}
        </FormControl>
        {authError && <div className='text-red-500'>{authError}</div>}
        <Button
          variant="outlined"
          type='submit'
          fullWidth
          size='medium'
          sx={{ mt: 3, mb: 2 }}
          color={isFormValid ? 'primary' : 'error'}
        >
          {isSignIn ? 'Sign in' : 'Sign up'}
        </Button>
        <Link variant="body2" onClick={onSignChange}>
          {isSignIn ? 'Don\'t have an account? Sign Up' : 'Sign in'}
        </Link>
      </Box>
    </div>
  )
}

export default AuthForm