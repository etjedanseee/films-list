import { toast } from 'react-toastify';
import { ILink, ISearchDataOnSitesResponse } from './../types/search';

interface ISearchDataOnSitesProps {
  sites: string[],
  search: string,
  year: string,
  setSitesResults: (results: ILink[]) => void,
  setLoading: (b: boolean) => void,
}

export const searchDataOnSites = async ({ search, sites, setSitesResults, setLoading, year }: ISearchDataOnSitesProps) => {
  const endUrl = 'https://www.googleapis.com/customsearch/v1'
  const apiKey = process.env.REACT_APP_GOOGLE_SEARCH_API_KEY;
  const cx = process.env.REACT_APP_GOOGLE_SEARCH_ENGINE_ID
  if (!apiKey || !cx) {
    throw new Error('No google apiKey or cx')
  }
  setLoading(true)
  const numOfResponse = 10
  console.log(search, sites)
  const promises: Promise<Response>[] = sites.map(site => {
    const url = `${endUrl}?key=${apiKey}&cx=${cx}&siteSearch=${site}&q=${search}&num=${numOfResponse}&exactTerms=${search}`;
    return fetch(url)
      .then(response => response.json())
      .catch(error => ({ error }))
  })

  const results: ILink[] = sites.map(site => ({ site, result: null }))
  try {
    const responses = await Promise.allSettled(promises);
    const lowerSearch = search.toLowerCase()
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
            const filteredItems = items.filter(i => i.snippet.toLowerCase().includes(lowerSearch))
              .sort((a, b) => {
                const aRes = a.title.includes(year) || a.snippet.includes(year)
                const bRes = b.title.includes(year) || b.snippet.includes(year)
                if (aRes && bRes) {
                  return 0
                } else if (aRes && !bRes) {
                  return -1
                } else return 1
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
    const sortedResults = results.sort((a, b) => {
      if (a.result && b.result) {
        return 0
      }
      else if (a.result && !b.result) {
        return -1
      } else return 1
    })
    console.log('sorted results', sortedResults)
    setSitesResults(sortedResults)
  } catch (error) {
    console.error('Error during Promise.allSettled:', error);
  } finally {
    setLoading(false)
  }
}