import { removeSymbolsFromString } from './../utils/removeSymbolsFromString';
import { IUserSearchApiSettings } from './../types/auth';
import { toast } from 'react-toastify';
import { ILink, ISearchDataOnSitesResponse } from './../types/search';
import { findSubString } from '../utils/findSubString';

interface ISearchDataOnSitesProps {
  searchApiSettings: IUserSearchApiSettings,
  sites: string[],
  search: string,
  year: string,
  setSitesResults: (results: ILink[]) => void,
  setLoading: (b: boolean) => void,
  originalTitle: string,
}

export const searchDataOnSites = async ({ searchApiSettings, search, sites, setSitesResults, setLoading, year, originalTitle }: ISearchDataOnSitesProps) => {
  const endUrl = 'https://www.googleapis.com/customsearch/v1'
  const { searchApiKey: apiKey, searchEngineId: cx } = searchApiSettings
  if (!apiKey || !cx) {
    throw new Error('No google api key or engineId')
  }
  //mb add alternative titles
  const titles = [search]
  if (originalTitle && originalTitle !== search) {
    titles.push(originalTitle)
  }
  const titlesToUrl = titles.map(title => encodeURIComponent(title)).join(',')
  console.log('titlesToUrl', titlesToUrl)
  setLoading(true)
  console.log(search, search.length, sites)
  //if <2 words or <n (10) length orTerms
  const orTerms = search.length < 10 ? `&orTerms=${titlesToUrl}` : ''
  const promises: Promise<Response>[] = sites.map(site => {
    // const url = `${endUrl}?key=${apiKey}&cx=${cx}&siteSearch=${site}&q=${search}&orTerms=${titlesToUrl}`;
    const url = `${endUrl}?key=${apiKey}&cx=${cx}&siteSearch=${site}&q=${search}${orTerms}`;
    // const url = `${endUrl}?key=${apiKey}&cx=${cx}&siteSearch=${site}&q=${search}`;
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
            const items = res.items
            console.log('items for', sites[index], items)
            const filteredItems = items.filter(res => {
              const lowerSnippet = res?.snippet?.toLowerCase() || ''
              const lowerResTitle = res?.title?.toLowerCase() || ''
              if (!lowerSnippet.length || !lowerResTitle.length) {
                return false
              }
              const clearSnippet = removeSymbolsFromString(lowerSnippet)
              const clearResTitle = removeSymbolsFromString(lowerResTitle)
              for (let title of titles) {
                const lowerTitle = title.toLowerCase()
                if (lowerSnippet.includes(lowerTitle) || lowerResTitle.includes(lowerTitle)) {
                  return true
                }
                const clearTitle = removeSymbolsFromString(lowerTitle)
                const howSimilarSnippet = findSubString(clearTitle, clearSnippet)
                const howSimilarResTitle = findSubString(clearTitle, clearResTitle)
                if (howSimilarSnippet >= 0.9 || howSimilarResTitle >= 0.9) {
                  return true
                }
              }
              return false
            })
              .sort((a, b) => {
                const aTitleIncludesYear = a.title.includes(year) ? 1 : 0
                const aSnippetIncludeslYear = a.snippet.includes(year) ? 1 : 0
                const aTitleIncludesSearch = a.title.toLowerCase().includes(search.toLowerCase()) ? 1 : 0
                const bTitleIncludesYear = b.title.includes(year) ? 1 : 0
                const bSnippetIncludeslYear = b.snippet.includes(year) ? 1 : 0
                const bTitleIncludesSearch = b.title.toLowerCase().includes(search.toLowerCase()) ? 1 : 0
                const aScore = aTitleIncludesYear + aSnippetIncludeslYear + aTitleIncludesSearch
                const bScore = bTitleIncludesYear + bSnippetIncludeslYear + bTitleIncludesSearch
                return bScore - aScore
              })
            console.log('filteredItems for', sites[index], filteredItems)
            if (filteredItems.length) {
              results[index] = {
                site: sites[index], result: {
                  link: filteredItems[0].link,
                  title: filteredItems[0].title,
                }
              }
            }
          }
        }
      }
      index++
    }
    const sortedResults = results.sort((a, b) => ((b?.result && 1) || 0) - ((a?.result && 1) || 0))
    setSitesResults(sortedResults)
  } catch (error) {
    console.error('Error during Promise.allSettled:', error);
  } finally {
    setLoading(false)
  }
}