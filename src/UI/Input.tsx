import React, { ChangeEvent, useState } from 'react'
import { ReactComponent as EyeIcon } from '../assets/eye.svg';

interface InputProps {
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void,
  value: string,
  placeholder: string,
  onBlur?: () => void,
  onFocus?: () => void,
  isPassword?: boolean,
  autoCompleteValue?: string
}

const Input = ({ placeholder = '', onInputChange, value, onBlur = () => { }, onFocus = () => { }, isPassword, autoCompleteValue }: InputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(!isPassword)

  const handlePasswordVisible = () => {
    setIsPasswordVisible(prev => !prev)
  }

  return (
    <div className='relative'>
      <input
        value={value}
        type={!isPasswordVisible && isPassword ? 'password' : 'text'}
        onChange={(e) => onInputChange(e)}
        placeholder={placeholder}
        autoComplete={autoCompleteValue || 'on'}
        className={`border-black bg-zinc-800 text-white} 
          w-full border-b px-4 py-1 mb-1 outline-none flex items-center
        `}
        spellCheck={false}
        onBlur={onBlur}
        onFocus={onFocus}
      />
      {isPassword && (
        <EyeIcon
          className={`absolute top-2 right-2 h-5 w-5 hover:cursor-pointer fill-slate-300`}
          onClick={handlePasswordVisible}
        />
      )
      }
    </div>
  )
}

export default Input