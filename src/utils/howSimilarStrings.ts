import { allStringMatchesIndexes } from "./allStringMatchesIndexes"
import { MIN_STRINGS_SIMILARITY } from "./consts"
import { isIncludesEntirely } from "./isIncludesEntirely"

export const howSimilarStrings = (search: string, str: string): number => {
  if (!search || !str) {
    return 0
  }
  if (isIncludesEntirely(search, str)) {
    return 1
  }
  const splittedSearch = search.split(/\s+/)
  if (splittedSearch.length < 2) {
    return 0
  }
  let maxSimilarity = 0
  const firstWord = splittedSearch[0]
  const lastWord = splittedSearch[splittedSearch.length - 1]
  const startIndexes = allStringMatchesIndexes(firstWord, str)
  const endIndexes = allStringMatchesIndexes(lastWord, str)
  for (const startIndex of startIndexes) {
    for (const endIndex of endIndexes) {
      if (endIndex <= startIndex) {
        continue
      }
      //compare search and 'firstWord...lastWord'
      const searchInStr = str.slice(startIndex, endIndex + lastWord.length)
      const similarity = calcStringsSimilarity(search, searchInStr)
      if (similarity >= MIN_STRINGS_SIMILARITY) {
        maxSimilarity = Math.max(maxSimilarity, similarity)
      }
    }
  }
  return maxSimilarity
}

export const calcStringsSimilarity = (search: string, str: string): number => {
  if (!search || !str) return 0
  const maxLength = Math.max(search.length, str.length);
  const distance = levenshteinDistance(search, str);
  const similarity = 1 - distance / maxLength;
  return similarity
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

