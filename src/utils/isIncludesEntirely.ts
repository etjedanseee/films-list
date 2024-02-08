import { isCharLetter } from "./isCharLetter"

export const isIncludesEntirely = (search: string, str: string): boolean => {
  //while(str.slice(pos).indexOf!==-1)
  const pos = str.indexOf(search)
  if (pos !== -1) {
    let isNextCharLetter = pos + search.length < str.length ? isCharLetter(str[pos + search.length]) : false
    let isPrevCharLetter = pos - 1 >= 0 ? isCharLetter(str[pos - 1]) : false
    if (!isNextCharLetter && !isPrevCharLetter) {
      return true
    }
  }
  return false
}