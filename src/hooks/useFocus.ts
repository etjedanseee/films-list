import { useRef } from "react"

export const useFocus = () => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const setInputFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }
  const setInputBlur = () => {
    if (inputRef.current) {
      inputRef.current.blur()
    }
  }
  return { inputRef, setInputFocus, setInputBlur }
}