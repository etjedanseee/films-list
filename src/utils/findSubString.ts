import { howSimilarStrings } from "./howSimilarStrings";

export const findSubString = (search: string, str: string) => {
  const isIncludes = str.includes(search)
  if (isIncludes) {
    return 1
  }
  const splittedSearch = search.split(/\s+/)
  // console.log('s1,s2', splittedSub[0], splittedSub[splittedSub.length - 1])

  if (splittedSearch.length < 2) {
    return isIncludes ? 1 : 0
  }
  const lastWord = splittedSearch[splittedSearch.length - 1]
  /*
    if several 'the' need to find pos that continue phrase (if s[i+splittedSearch[1].length+1]===splittedSearch[1])
    for loop where changes indexStart
  */
  const indexStart = str.indexOf(splittedSearch[0])
  const indexEnd = str.indexOf(lastWord)
  if (indexStart !== -1 && indexEnd !== -1 && indexStart < indexEnd) {
    const similarity = howSimilarStrings(search, str.slice(indexStart, indexEnd + lastWord.length))
    console.log(`similarity ${similarity.toFixed(2)} for: ${search} || ${str.slice(indexStart, indexEnd + lastWord.length)}`)
    return similarity
  } else {
    return isIncludes ? 1 : 0
  }
}