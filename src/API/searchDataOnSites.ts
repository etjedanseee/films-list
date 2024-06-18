import { isIncludesEntirely } from './../utils/isIncludesEntirely';
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
  found: {
    place: 'title' | 'snippet',
    title: string,
    similarity: number,
    includesYear: 'title' | 'snippet' | null,
  },
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

export const searchDataOnSites = async ({ searchApiSettings, search, sites, dataId, mediaType, setSitesResults, setLoading, year, originalTitle }: ISearchDataOnSitesProps) => {
  const endUrl = 'https://www.googleapis.com/customsearch/v1'
  const { searchApiKey: apiKey, searchEngineId: cx } = searchApiSettings
  if (!apiKey || !cx) {
    throw new Error('No google api key or engineId')
  }
  const defaultTitles = originalTitle && originalTitle !== search ? [search, originalTitle] : [search]
  setLoading(true)
  const alternativeTitles = await fetchDataAlternativeTitles({ dataId, mediaType, setLoading: () => { }, })
  const titles = Array.from(new Set([...defaultTitles, ...alternativeTitles]))
  console.log('titles', titles)
  const promises: Promise<Response>[] = sites.map(site => {
    const url = `${endUrl}?key=${apiKey}&cx=${cx}&siteSearch=${site}&q=${search}`;
    return fetch(url)
      .then(response => response.json())
      .catch(error => ({ error }))
  })
  const results: ILink[] = sites.map(site => ({ site, result: null }))
  try {
    const responses = await Promise.allSettled(promises);
    let index = 0
    for (let response of responses) {
      if (response.status === 'fulfilled') {
        const data = response.value;
        if ('error' in data) {
          const error = data.error as { code: number }
          if (error.code === 429) {
            toast.error("Quota exceeded for: 'Queries per day'", { autoClose: 5000 })
            break;
          }
        } else {
          const res = data as ISearchDataOnSitesResponse
          if (res?.items && res.items.length) {
            console.log('items for', sites[index], res.items)
            const items: ISearchOnSitesResults[] = res.items.map(item => {
              const lowerSnippet = item?.snippet?.toLowerCase() || ''
              const lowerResTitle = item?.title?.toLowerCase() || ''
              if (!lowerSnippet.length && !lowerResTitle.length) {
                return { ...item, found: null }
              }
              const clearSnippet = removeSymbolsFromString(lowerSnippet)
              const clearResTitle = removeSymbolsFromString(lowerResTitle)
              const foundedResults: {
                place: 'title' | 'snippet',
                title: string,
                similarity: number,
                includesYear: 'title' | 'snippet' | null,
              }[] = [];
              for (let title of titles) {
                const lowerTitle = title.toLowerCase()
                const includesYear = lowerResTitle.includes(year) ? 'title' : lowerSnippet.includes(year) ? 'snippet' : null
                const clearTitle = removeSymbolsFromString(lowerTitle)
                const howSimilarResTitle = howSimilarStrings(clearTitle, clearResTitle)
                if (howSimilarResTitle >= MIN_STRINGS_SIMILARITY) {
                  foundedResults.push({ place: 'title', title, similarity: howSimilarResTitle, includesYear })
                  continue
                }
                const howSimilarSnippet = howSimilarStrings(clearTitle, clearSnippet)
                if (howSimilarSnippet >= MIN_STRINGS_SIMILARITY) {
                  foundedResults.push({ place: 'snippet', title, similarity: howSimilarSnippet, includesYear })
                }
              }
              if (foundedResults.length) {
                foundedResults.sort((a, b) => {
                  const aYear = a.includesYear === 'title' ? 2 : 1
                  const aPlace = a.place === 'title' ? 3 : 1
                  const aSim = a.similarity === 1 ? 1 : 0
                  const bYear = b.includesYear === 'title' ? 2 : 1
                  const bPlace = b.place === 'title' ? 3 : 1
                  const bSim = b.similarity === 1 ? 1 : 0
                  return (bYear + bPlace + bSim) - (aYear + aPlace + aSim)
                })
                const bestResult = foundedResults[0]
                return { ...item, found: bestResult }
              }
              return { ...item, found: null }
            })
            const filteredItems = items.filter(item => !!item.found) as ISearchOnSitesFoundResults[]
            const sortedItems = filteredItems.sort((a, b) => {
              const aYear = a.found.includesYear === 'title' ? 2 : 1
              const aPlace = a.found.place === 'title' ? 3 : 1
              const aSim = a.found.similarity === 1 ? 1 : 0
              const bYear = b.found.includesYear === 'title' ? 2 : 1
              const bPlace = b.found.place === 'title' ? 3 : 1
              const bSim = b.found.similarity === 1 ? 1 : 0
              return (bYear + bPlace + bSim) - (aYear + aPlace + aSim)
            })
            if (sortedItems.length) {
              console.log('sortedItems for', sites[index], sortedItems)
              results[index] = {
                site: sites[index], result: {
                  link: sortedItems[0].link,
                  title: sortedItems[0].title,
                }
              }
            }
          }
        }
      }
      index++
    }
    if (!results.length) {
      setSitesResults([])
      setLoading(false)
      return;
    }
    results.sort((a, b) => ((b?.result && 1) || 0) - ((a?.result && 1) || 0))
    setSitesResults(results)
  } catch (error) {
    console.error('Error during search on sites:', error);
  } finally {
    setLoading(false)
  }
}