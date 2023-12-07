import { useState, useEffect } from 'react'

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    return () => clearTimeout(debounceTimeout)
  }, [value, delay])

  return debouncedValue
}