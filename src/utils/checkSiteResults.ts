import { IFoundedSitesResultsDetails, ISearchDataOnSitesResponse, ISearchOnSitesResults } from "../types/search"
import { MIN_STRINGS_SIMILARITY } from "./consts"
import { howSimilarStrings } from "./howSimilarStrings"
import { removeSymbolsFromString } from "./removeSymbolsFromString"

interface ICheckSiteResultsProps {
  data: ISearchDataOnSitesResponse,
  titles: string[],
  year: string,
}

export const checkSiteResults = ({ data, titles, year }: ICheckSiteResultsProps): ISearchOnSitesResults[] => {
  return data?.items?.map(item => {
    const lowerSnippet = item?.snippet?.toLowerCase() || ''
    const lowerResTitle = item?.title?.toLowerCase() || ''
    if (!lowerSnippet.length && !lowerResTitle.length) {
      return { ...item, found: null }
    }
    const clearSnippet = removeSymbolsFromString(lowerSnippet)
    const clearResTitle = removeSymbolsFromString(lowerResTitle)
    const foundedResultsForSite: IFoundedSitesResultsDetails[] = [];
    for (let title of titles) {
      const includesYear = lowerResTitle.includes(year)
        ? 'title'
        : lowerSnippet.includes(year)
          ? 'snippet'
          : null
      const lowerTitle = title.toLowerCase()
      const clearTitle = removeSymbolsFromString(lowerTitle)
      const howSimilarResTitle = howSimilarStrings(clearTitle, clearResTitle)
      if (howSimilarResTitle >= MIN_STRINGS_SIMILARITY) {
        foundedResultsForSite.push({ place: 'title', similarity: howSimilarResTitle, title, includesYear })
        continue
      }
      const howSimilarSnippet = howSimilarStrings(clearTitle, clearSnippet)
      if (howSimilarSnippet >= MIN_STRINGS_SIMILARITY) {
        foundedResultsForSite.push({ place: 'snippet', similarity: howSimilarSnippet, title, includesYear })
      }
    }
    if (!foundedResultsForSite.length) {
      return { ...item, found: null }
    }
    foundedResultsForSite.sort((a, b) => {
      const aYear = a.includesYear === 'title' ? 2 : 1
      const aPlace = a.place === 'title' ? 3 : 1
      const aSim = a.similarity === 1 ? 1 : 0
      const bYear = b.includesYear === 'title' ? 2 : 1
      const bPlace = b.place === 'title' ? 3 : 1
      const bSim = b.similarity === 1 ? 1 : 0
      return (bYear + bPlace + bSim) - (aYear + aPlace + aSim)
    })
    const bestResultForSite = foundedResultsForSite[0]
    return { ...item, found: bestResultForSite }
  }) || []
}