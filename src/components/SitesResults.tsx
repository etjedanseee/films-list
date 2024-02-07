import React, { useEffect } from 'react'
import { ILink } from '../types/search'
import { useTypedSelector } from '../hooks/useTypedSelector'
import Loader from '../UI/Loader'
import { useActions } from '../hooks/useActions'
import SiteResultItem from './SiteResultItem'

interface SitesProps {
  dataTitle: string,
  loading: boolean,
  setLoading: (b: boolean) => void,
  results: ILink[],
  id: number | null,
  isNeedToUpdateDataLinks: React.MutableRefObject<boolean>,
}

const SitesResults = ({ results, loading, id, setLoading, isNeedToUpdateDataLinks, dataTitle }: SitesProps) => {
  const { sites } = useTypedSelector(state => state.sites)
  const { data } = useTypedSelector(state => state.data)
  const { updateDataLinksOnSb } = useActions()

  const onSaveEditedResult = (site: string, updatedLink: string) => {
    if (!id) {
      return;
    }
    const editedResult: ILink = {
      site,
      result: {
        title: dataTitle,
        link: updatedLink,
      }
    }
    const editedResults = [...results.map(res => res.site === site ? editedResult : res)]
      .sort((a, b) => ((b?.result && 1) || 0) - ((a?.result && 1) || 0))
    updateDataLinksOnSb(id, editedResults, setLoading, data)
  }


  useEffect(() => {
    if (isNeedToUpdateDataLinks.current && id && results.length) {
      isNeedToUpdateDataLinks.current = false
      updateDataLinksOnSb(id, results, setLoading, data)
    }
  }, [results, id, setLoading, isNeedToUpdateDataLinks, data])

  return (
    <div className='bg-inherit'>
      {loading ? (
        <div className='flex flex-col gap-y-1'>
          {!!sites.length && sites.map(site => (
            <div key={site} className='flex items-center gap-x-4'>
              <div className='flex justify-center items-center'><Loader size='24' /></div>
              <div className='truncate'>{site}</div>
            </div>
          ))}
        </div>
      )
        : (
          <div className='flex flex-col gap-y-1 max-w-full'>
            {!!results.length && results.map(item => (
              <SiteResultItem
                item={item}
                onUpdateSiteResult={onSaveEditedResult}
                key={item.site}
              />
            ))}
          </div>
        )}
    </div>
  )
}

export default SitesResults