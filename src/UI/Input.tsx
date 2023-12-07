import React, { ChangeEvent, useState } from 'react'
import { ReactComponent as EyeIcon } from '../assets/eye.svg';

interface InputProps {
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void,
  value: string,
  placeholder: string,
  onBlur?: () => void,
  onFocus?: () => void,
  isPassword?: boolean,
  autoCompleteValue?: string,
  error: string,
  isFieldDirty: boolean,
  name: string,
  className?: string,
  py?: string,
  titleBg?: string,
}

const Input = ({ placeholder = '', onInputChange, value, onBlur = () => { }, onFocus = () => { }, isPassword, autoCompleteValue, error, isFieldDirty, name, className = '', py = 'py-4', titleBg = 'bg-bg1' }: InputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(!isPassword)
  const [isFocused, setIsFocused] = useState(false)

  const onInputFocus = () => {
    onFocus()
    setIsFocused(true)
  }

  const onInputBlur = () => {
    onBlur()
    setIsFocused(false)
  }

  const handlePasswordVisible = () => {
    setIsPasswordVisible(prev => !prev)
  }

  return (
    <div className={`relative bg-inherit ${className}`}>
      <div className={`${isFocused || error || value
        ? '-translate-y-2 translate-x-2 px-1'
        : `translate-x-3 ${py === 'py-4'
          ? 'translate-y-5'
          : py === 'py-3'
            ? 'translate-y-4'
            : 'translate-y-3'
        }`} 
        absolute top-0 left-0 text-xs ${titleBg} select-none transition-transform duration-300 
        ${error ? 'text-myred' : 'text-white'}
      `}
      >
        {name}
      </div>
      <input
        value={value}
        type={!isPasswordVisible && isPassword ? 'password' : 'text'}
        onChange={(e) => onInputChange(e)}
        placeholder={isFocused || error ? placeholder : ''}
        autoComplete={autoCompleteValue || 'on'}
        className={`${error ? 'border-myred' : 'border-white'} bg-transparent text-white  
          w-full border-2 rounded-[4px] px-3 text-sm ${py} mb-1 outline-none flex items-centers
        `}
        spellCheck={false}
        onBlur={onInputBlur}
        onFocus={onInputFocus}
      />
      {isPassword && (
        <EyeIcon
          className={`absolute ${!!error && isFieldDirty ? 'top-1/4' : 'top-1/2 -translate-y-1/2'} 
            right-3 h-5 w-5 hover:cursor-pointer fill-slate-300
          `}
          onClick={handlePasswordVisible}
        />
      )}
      {!!error && isFieldDirty && (
        <div className='text-myred pl-3 text-xs select-none'>{error}</div>
      )}
    </div>
  )
}

export default Input