import React from 'react'
import { buttonVariant } from './types';

interface ButtonProps {
  title: string,
  variant?: buttonVariant,
  disabled?: boolean,
  p?: string,
  type?: 'button' | 'reset' | 'submit',
  onClick: () => void,
  className?: string,
}

const Button = ({ title, variant, disabled, onClick, p, type, className }: ButtonProps) => {
  return (
    <button
      className={`border-2 ${disabled ? 'border-myred' : 'border-myblue hover:shadow-myshadow'} 
        ${variant || 'rounded-md'} w-full px-4 ${p ? p : 'py-2'} 
        text-center font-medium select-none cursor-pointer active:border-cyan-500 ${className}
      `}
      onClick={onClick}
      type={type || 'button'}
      disabled={disabled}
    >
      {title}
    </button>
  )
}

export default Button