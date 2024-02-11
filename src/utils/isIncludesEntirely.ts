import { allStringMatchesIndexes } from "./allStringMatchesIndexes"
import { isCharLetter } from "./isCharLetter"

export const isIncludesEntirely = (search: string, str: string): boolean => {
  if (!search.length || !str.length) {
    return false
  }
  const positions = allStringMatchesIndexes(search, str)
  for (const pos of positions) {
    const isNextCharLetter = pos + search.length < str.length ? isCharLetter(str[pos + search.length]) : false
    const isPrevCharLetter = pos - 1 >= 0 ? isCharLetter(str[pos - 1]) : false
    if (!isNextCharLetter && !isPrevCharLetter) {
      return true
    }
  }
  return false
}