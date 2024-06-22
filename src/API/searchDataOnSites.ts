import { IUserSearchApiSettings } from './../types/auth';
import { toast } from 'react-toastify';
import { ILink, ISearchDataOnSitesResponse, MediaType } from './../types/search';
import { fetchDataAlternativeTitles } from './fetchDataAlternativeTitles';
import { fetchSearchOnSitesResults } from './fetchSearchOnSitesResults';
import { checkSiteResults } from '../utils/checkSiteResults';
import { sortSiteResults } from '../utils/sortSiteResults';

export interface ISearchDataOnSitesProps {
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
    const sitesResponses = await fetchSearchOnSitesResults({ apiKey, cx, endUrl, search, sites })
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
  } finally {
    setLoading(false)
  }
}