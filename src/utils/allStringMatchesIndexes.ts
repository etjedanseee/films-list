export const allStringMatchesIndexes = (search: string, str: string): number[] => {
  if (!search.length || !str.length) {
    return []
  }
  const regex = new RegExp(search, 'g');
  let matches: RegExpExecArray | null;
  const indexes: number[] = [];
  while ((matches = regex.exec(str)) !== null) {
    indexes.push(matches.index);
  }
  return indexes
}