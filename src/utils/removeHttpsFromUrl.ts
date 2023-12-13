export const removeHttpFromUrl = (url: string) => {
  let editedUrl = url.startsWith("http://")
    ? url.slice(7)
    : url.startsWith("https://")
      ? url.slice(8)
      : url
  if (editedUrl.endsWith('/')) {
    editedUrl = editedUrl.slice(0, editedUrl.length - 1)
  }
  return editedUrl
}