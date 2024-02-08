import { isIncludesEntirely } from "./isIncludesEntirely"

export const howSimilarStrings = (search: string, str: string): number => {
  if (isIncludesEntirely(search, str)) {
    return 1
  }
  const splittedSearch = search.split(/\s+/)
  // console.log('s1,s2', splittedSearch[0], splittedSearch[splittedSearch.length - 1])
  if (splittedSearch.length < 2) {
    return 0
  }
  const lastWord = splittedSearch[splittedSearch.length - 1]
  /*
    if several 'the' need to find pos that continue phrase (if s[i+splittedSearch[1].length+1]===splittedSearch[1])
    for loop where changes indexStart
  */
  const indexStart = str.indexOf(splittedSearch[0])
  const indexEnd = str.indexOf(lastWord)
  if (indexStart !== -1 && indexEnd !== -1 && indexStart < indexEnd) {
    const searchInStr = str.slice(indexStart, indexEnd + lastWord.length)
    const maxLength = Math.max(search.length, searchInStr.length);
    const distance = levenshteinDistance(search, searchInStr);
    const similarity = 1 - distance / maxLength;
    console.log(`similarity ${similarity.toFixed(2)} for: ${search} || ${searchInStr}`)
    return similarity
  } else {
    return 0
  }
}

const levenshteinDistance = (str1: string, str2: string) => {
  const m = str1.length;
  const n = str2.length;
  const dp: number[][] = [];
  // Initialize the matrix
  for (let i = 0; i <= m; i++) {
    dp[i] = [];
    for (let j = 0; j <= n; j++) {
      if (i === 0) {
        dp[i][j] = j;
      } else if (j === 0) {
        dp[i][j] = i;
      } else {
        dp[i][j] = 0;
      }
    }
  }
  // Fill in the matrix based on Levenshtein distance formula
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1, // Deletion
        dp[i][j - 1] + 1, // Insertion
        dp[i - 1][j - 1] + cost // Substitution
      );
    }
  }
  // The bottom-right cell of the matrix contains the Levenshtein distance
  return dp[m][n];
}

