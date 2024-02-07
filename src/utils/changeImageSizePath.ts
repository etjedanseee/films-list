import { posterSizes } from "./consts"


export const changeImageSizePath = (url: string, sizeIndex: number = 3): string => {
  const index = url.indexOf(posterSizes[2])
  if (!~index) {
    return url
  }
  return url.slice(0, index) + (posterSizes[sizeIndex] || posterSizes[3]) + url.slice(index + 4)
}