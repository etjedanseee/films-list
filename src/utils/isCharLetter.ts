export const isCharLetter = (char: string): boolean => {
  const regex = /\p{L}/u; // Unicode property for letters
  return regex.test(char);
}