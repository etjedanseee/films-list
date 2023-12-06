export const formatVote = (vote: number) => {
  return vote.toFixed(1).lastIndexOf('.0') !== -1 ? vote.toFixed(0) : vote.toFixed(1)
}