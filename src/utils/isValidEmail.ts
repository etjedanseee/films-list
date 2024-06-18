export const isValidEmail = (str: string): boolean => {
  const regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  return !!regexEmail.test(str)
}