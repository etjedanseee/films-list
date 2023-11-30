
interface ISearchDataOnSitesProps {
  sites: string[],
  search: string,
}

export const searchDataOnSites = async ({ search, sites }: ISearchDataOnSitesProps) => {
  const endUrl = 'https://www.googleapis.com/customsearch/v1'
  const apiKey = process.env.REACT_APP_GOOGLE_SEARCH_API_KEY;
  const cx = process.env.REACT_APP_GOOGLE_SEARCH_ENGINE_ID
  const numOfResponse = 1
  console.log(search, sites)

  if (!apiKey || !cx) {
    return null
  }
  const promises: Promise<Response>[] = sites.map(site => {
    const url = `${endUrl}?key=${apiKey}&cx=${cx}&siteSearch=${site}&q=${search}&num=${numOfResponse}`;
    return fetch(url)
      .then(response => response.json())
      .catch(error => ({ error }))
  })

  try {
    const results = await Promise.allSettled(promises);
    results.forEach(result => {
      if (result.status === 'fulfilled') {
        const data = result.value;
        if ('error' in data) {
          console.error('Rejected:', data.error);
        } else {
          console.log('Fulfilled:', data);
        }
      } else {
        const reason = result.reason;
        console.error('Rejected:', reason);
      }
    });
  } catch (error) {
    console.error('Error during Promise.allSettled:', error);
  }
}