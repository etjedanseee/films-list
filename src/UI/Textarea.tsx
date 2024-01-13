import React, { ChangeEvent, useEffect, useRef } from 'react'

interface TextareaProps {
  value: string,
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void,
  placeholder?: string,
}

const Textarea = ({ value, onChange, placeholder }: TextareaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '20px'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight
    }
  }

  useEffect(() => {
    handleHeight()
  }, [value])

  return (
    <textarea
      value={value}
      onChange={onChange}
      ref={textareaRef}
      placeholder={placeholder}
      className={`resize-none overflow-hidden w-full bg-inherit outline-none border-white border-[1px] rounded-md py-2 px-2 
        text-sm min-h-[50px] leading-tight max-w-none
      `}
      spellCheck={false}
    />
  )
}

export default Textarea