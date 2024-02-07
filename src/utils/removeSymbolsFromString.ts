

export const removeSymbolsFromString = (str: string) => {
  const regex = /[^\p{L}\d\s]/gu;
  const result = str.replace(regex, '');
  return result;
}