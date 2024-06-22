import { ISearchOnSitesFoundResults, ISearchOnSitesResults } from "../types/search"

export const sortSiteResults = (results: ISearchOnSitesResults[]) => {
  const filteredResults = results.filter(res => !!res.found) as ISearchOnSitesFoundResults[]
  const sortedItems = [...filteredResults].sort((a, b) => {
    const aYear = a.found.includesYear === 'title' ? 2 : 1
    const aPlace = a.found.place === 'title' ? 3 : 1
    const aSim = a.found.similarity === 1 ? 1 : 0
    const bYear = b.found.includesYear === 'title' ? 2 : 1
    const bPlace = b.found.place === 'title' ? 3 : 1
    const bSim = b.found.similarity === 1 ? 1 : 0
    return (bYear + bPlace + bSim) - (aYear + aPlace + aSim)
  })
  return sortedItems
}