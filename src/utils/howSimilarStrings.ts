
export const howSimilarStrings = (str1: string, str2: string) => {
  const maxLength = Math.max(str1.length, str2.length);
  const distance = levenshteinDistance(str1, str2);
  return 1 - distance / maxLength;
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

