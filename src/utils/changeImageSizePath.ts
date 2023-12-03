import { posterSizes } from "./consts"


export const changeImageSizePath = (url: string): string => {
  const index = url.indexOf('w185')
  if (!~index) {
    return url
  }
  return url.slice(0, index) + posterSizes[3] + url.slice(index + 4)
}