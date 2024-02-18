export const formatMinToHours = (min: number) => {
  const hours = Math.floor(min / 60)
  const minutes = min - hours * 60
  return `${hours}h ${minutes}m`
}