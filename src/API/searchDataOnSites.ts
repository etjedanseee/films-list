import { ILink, ISearchDataOnSitesResponse } from './../types/search';

interface ISearchDataOnSitesProps {
  sites: string[],
  search: string,
  setSitesResults: (results: ILink[]) => void,
  setLoading: (b: boolean) => void,
}

export const searchDataOnSites = async ({ search, sites, setSitesResults, setLoading }: ISearchDataOnSitesProps) => {
  const endUrl = 'https://www.googleapis.com/customsearch/v1'
  const apiKey = process.env.REACT_APP_GOOGLE_SEARCH_API_KEY;
  const cx = process.env.REACT_APP_GOOGLE_SEARCH_ENGINE_ID
  if (!apiKey || !cx) {
    throw new Error('No google apiKey or cx')
  }
  setLoading(true)
  const numOfResponse = 1
  console.log(search, sites)
  const promises: Promise<Response>[] = sites.map(site => {
    const url = `${endUrl}?key=${apiKey}&cx=${cx}&siteSearch=${site}&q=${search}&num=${numOfResponse}&exactTerms=${search}`;
    return fetch(url)
      .then(response => response.json())
      .catch(error => ({ error }))
  })

  const results: ILink[] = []
  try {
    const responses = await Promise.allSettled(promises);
    let index = 0
    for (let response of responses) {
      if (response.status === 'fulfilled') {
        const data = response.value;
        if ('error' in data) {
          console.error('Rejected:', data.error);
          results.push({ site: sites[index], result: null })
        } else {
          const res = data as ISearchDataOnSitesResponse
          if (res?.items && res.items.length) {
            const items = res.items
            const filteredItems = items.filter(i => i.snippet.includes(search))
            if (filteredItems.length) {
              results.push({
                site: sites[index], result: {
                  link: res.items[0].link,
                  title: res.items[0].title,
                }
              })
            } else {
              results.push({ site: sites[index], result: null })
            }
          } else {
            results.push({ site: sites[index], result: null })
          }
        }
      } else {
        results.push({ site: sites[index], result: null })
        const reason = response.reason;
        console.error('Rejected:', reason);
      }
      index++
    }
    console.log('results', results)
    setSitesResults(results)
  } catch (error) {
    console.error('Error during Promise.allSettled:', error);
  } finally {
    setLoading(false)
  }
}