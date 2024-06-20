import { howSimilarStrings } from './../utils/howSimilarStrings';
import { removeSymbolsFromString } from './../utils/removeSymbolsFromString';
import { IUserSearchApiSettings } from './../types/auth';
import { toast } from 'react-toastify';
import { ILink, ISearchDataOnSitesResponse, MediaType } from './../types/search';
import { fetchDataAlternativeTitles } from './fetchDataAlternativeTitles';
import { MIN_STRINGS_SIMILARITY } from '../utils/consts';

interface ISearchOnSitesResults {
  displayLink: string,
  link: string,
  snippet: string,
  title: string,
  found: {
    place: 'title' | 'snippet',
    title: string,
    similarity: number,
    includesYear: 'title' | 'snippet' | null,
  } | null,
}

interface ISearchOnSitesFoundResults {
  displayLink: string,
  link: string,
  snippet: string,
  title: string,
  found: IFoundedSitesResults,
}

interface IFoundedSitesResults {
  place: 'title' | 'snippet',
  title: string,
  similarity: number,
  includesYear: 'title' | 'snippet' | null,
}

interface ISearchDataOnSitesProps {
  searchApiSettings: IUserSearchApiSettings,
  sites: string[],
  dataId: number,
  mediaType: MediaType,
  search: string,
  year: string,
  setSitesResults: (results: ILink[]) => void,
  setLoading: (b: boolean) => void,
  originalTitle: string,
}
interface fetchSearchOnSitesResultsProps {
  sites: string[],
  endUrl: string,
  apiKey: string,
  cx: string,
  search: string,
  setLoading: (b: boolean) => void,
}

interface checkSiteResultsProps {
  data: ISearchDataOnSitesResponse,
  titles: string[],
  year: string,
}

export const searchDataOnSites = async (params: ISearchDataOnSitesProps) => {
  const { searchApiSettings, search, sites, dataId, mediaType, setSitesResults, setLoading, year, originalTitle } = params
  try {
    const endUrl = 'https://www.googleapis.com/customsearch/v1'
    const { searchApiKey: apiKey, searchEngineId: cx } = searchApiSettings
    const results: ILink[] = sites.map(site => ({ site, result: null }))
    if (!apiKey || !cx) {
      toast.error('No google api key or engineId')
      throw new Error('No google api key or engineId')
    }
    setLoading(true)
    const defaultTitles = originalTitle && originalTitle !== search ? [search, originalTitle] : [search]
    const alternativeTitles = await fetchDataAlternativeTitles({ dataId, mediaType, setLoading: () => { }, })
    const titles = Array.from(new Set([...defaultTitles, ...alternativeTitles]))
    const sitesResponses = await fetchSearchOnSitesResults({ apiKey, cx, endUrl, search, sites, setLoading })
    let index = 0
    for (const response of sitesResponses) {
      if (response.status === 'rejected') {
        const error = response.reason
        if (error?.code === 429) {
          toast.error("Quota exceeded for: 'Queries per day'", { autoClose: 5000 })
        } else {
          console.error('Error during fetchSearchOnSitesResults for', sites[index], error)
        }
        break;
      }
      const data = response.value as ISearchDataOnSitesResponse
      if (data?.items?.length) console.log('items for', sites[index], data.items)
      const siteResults = checkSiteResults({ data, titles, year })
      const sortedSiteResults = sortSiteResults(siteResults)
      if (sortedSiteResults.length) {
        console.log('sortedItems for', sites[index], sortedSiteResults)
        results[index] = {
          site: sites[index],
          result: {
            link: sortedSiteResults[0].link,
            title: sortedSiteResults[0].title,
          }
        }
      }
      index++
    }
    results.sort((a, b) => (b?.result ? 1 : 0) - (a?.result ? 1 : 0))
    setSitesResults(results)
  } catch (e) {
    console.error('Error during searchDataOnSites', e);
  }
}

const fetchSearchOnSitesResults = async ({ apiKey, cx, endUrl, sites, search, setLoading }: fetchSearchOnSitesResultsProps) => {
  try {
    const sitesResponses = sites.map(site => {
      const url = `${endUrl}?key=${apiKey}&cx=${cx}&siteSearch=${site}&q=${search}`;
      return fetch(url)
        .then(response => response.json())
        .catch(error => {
          throw new Error(error)
        })
    })
    return await Promise.allSettled(sitesResponses)
  } catch (e) {
    console.error('Error during fetchSearchOnSitesResults:', e);
    return []
  } finally {
    setLoading(false)
  }
}

const checkSiteResults = ({ data, titles, year }: checkSiteResultsProps) => {
  const items: ISearchOnSitesResults[] = data?.items?.map(item => {
    const lowerSnippet = item?.snippet?.toLowerCase() || ''
    const lowerResTitle = item?.title?.toLowerCase() || ''
    if (!lowerSnippet.length && !lowerResTitle.length) {
      return { ...item, found: null }
    }
    const clearSnippet = removeSymbolsFromString(lowerSnippet)
    const clearResTitle = removeSymbolsFromString(lowerResTitle)
    const foundedResultsForSite: IFoundedSitesResults[] = [];
    for (let title of titles) {
      const lowerTitle = title.toLowerCase()
      const includesYear = lowerResTitle.includes(year)
        ? 'title'
        : lowerSnippet.includes(year)
          ? 'snippet'
          : null
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

  return items
}

const sortSiteResults = (results: ISearchOnSitesResults[]) => {
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