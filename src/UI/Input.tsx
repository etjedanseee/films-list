import React, { ChangeEvent, MouseEvent, useEffect, useState } from 'react'
import { ReactComponent as EyeIcon } from '../assets/eye.svg';
import { ReactComponent as ClearIcon } from '../assets/cancel.svg';
import { useFocus } from '../hooks/useFocus';

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
  isCanClean?: boolean,
  onClean?: () => void,
}

const Input = ({ placeholder = '', onInputChange, value, onBlur = () => { }, onFocus = () => { }, isPassword, autoCompleteValue, error, isFieldDirty, name, className = '', py = 'py-4', titleBg = 'bg-bg1', isCanClean, onClean = () => { } }: InputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(!isPassword)
  const [isFocused, setIsFocused] = useState(false)
  const { inputRef, setInputFocus, setInputBlur } = useFocus()

  const onInputFocus = () => {
    onFocus()
    setIsFocused(true)
  }

  const onInputBlur = () => {
    onBlur()
    setIsFocused(false)
  }

  const handlePasswordVisible = (e: MouseEvent) => {
    e.stopPropagation()
    setIsPasswordVisible(prev => !prev)
  }

  const onCleanClick = () => {
    setTimeout(() => {
      setInputBlur()
    }, 0)
    onClean()
  }

  useEffect(() => {
    const handleSubmit = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        setInputBlur()
      }
    }
    window.addEventListener('keypress', handleSubmit)
    return () => window.removeEventListener('keypress', handleSubmit)
  }, [])

  return (
    <div
      onClick={setInputFocus}
      className={`relative bg-inherit ${className}`}
    >
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
        ref={inputRef}
        type={!isPasswordVisible && isPassword ? 'password' : 'text'}
        onChange={(e) => onInputChange(e)}
        placeholder={isFocused || error ? placeholder : ''}
        autoComplete={autoCompleteValue || 'on'}
        className={`${error ? 'border-myred' : 'border-white'} bg-transparent text-white placeholder:text-xs xs:placeholder:text-sm
          w-full border-2 rounded-md px-3 ${isCanClean && 'pr-7'} text-sm ${py} outline-none flex items-centers
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
          onClick={e => handlePasswordVisible(e)}
        />
      )}
      {isCanClean && !!value.length && (
        <ClearIcon
          className={`absolute top-1/2 -translate-y-1/2 right-2 h-5 w-5 hover:cursor-pointer fill-slate-300 bg-bg1`}
          onClick={onCleanClick}
        />
      )}
      {!!error && isFieldDirty && (
        <div className='mt-1 text-myred pl-3 text-xs select-none'>{error}</div>
      )}
    </div>
  )
}

export default Input