import { posterSizes } from "./consts"


export const changeImageSizePath = (url: string): string => {
  const index = url.indexOf(posterSizes[2])
  if (!~index) {
    return url
  }
  return url.slice(0, index) + posterSizes[3] + url.slice(index + 4)
}