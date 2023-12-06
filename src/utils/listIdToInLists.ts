export const listIdToInLists = (id: number) => {
  return {
    id,
    date: new Date().toISOString()
  }
}