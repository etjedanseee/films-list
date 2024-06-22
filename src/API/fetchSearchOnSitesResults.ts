interface IFetchSearchOnSitesResultsProps {
  sites: string[],
  endUrl: string,
  apiKey: string,
  cx: string,
  search: string,
}

export const fetchSearchOnSitesResults = async ({ apiKey, cx, endUrl, sites, search }: IFetchSearchOnSitesResultsProps) => {
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
  }
}