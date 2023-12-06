export const getVoteBgColor = (vote: number) => {
  return vote <= 5
    ? 'bg-orange-500'
    : vote <= 8
      ? 'bg-yellow-500'
      : 'bg-green-500'
}