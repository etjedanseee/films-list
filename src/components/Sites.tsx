import React, { useEffect } from 'react'
import { ILink } from '../types/search'
import { ReactComponent as RejectedIcon } from '../assets/cancel.svg'
import { ReactComponent as SuccessIcon } from '../assets/success.svg'
import { useTypedSelector } from '../hooks/useTypedSelector'
import Loader from '../UI/Loader'
import { useActions } from '../hooks/useActions'

interface SitesProps {
  loading: boolean,
  setLoading: (b: boolean) => void,
  results: ILink[],
  id: number | null,
  isNeedToUpdateDataLinks: React.MutableRefObject<boolean>,
}

const Sites = ({ results, loading, id, setLoading, isNeedToUpdateDataLinks }: SitesProps) => {
  const { sites } = useTypedSelector(state => state.sites)
  const { data } = useTypedSelector(state => state.data)
  const { updateDataLinksOnSb } = useActions()

  useEffect(() => {
    if (isNeedToUpdateDataLinks.current && id && results.length) {
      isNeedToUpdateDataLinks.current = false
      updateDataLinksOnSb(id, results, setLoading, data)
    }
  }, [results, id, setLoading, isNeedToUpdateDataLinks, data])

  return (
    <div>
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
              <div key={item.site} className='flex items-center gap-x-2 xs:gap-x-4'>
                {item.result ? (
                  <SuccessIcon className='w-5 h-5 min-w-[20px] xs:h-7 xs:w-7 xs:min-w-[28px] fill-green-500' />
                ) : (
                  <RejectedIcon className='w-5 h-5 min-w-[20px] xs:h-7 xs:w-7 xs:min-w-[28px] fill-myred' />
                )}
                <div className='flex flex-col max-w-full overflow-hidden'>
                  <a
                    className='truncate'
                    href={'https://' + item.site}
                    target='_blank'
                    rel='noreferrer'
                  >
                    {item.site}
                  </a>
                  {!!item.result && (
                    <a
                      className='underline truncate text-xs xs:text-sm md:text-base'
                      href={item.result.link}
                      target='_blank'
                      rel='noreferrer'
                    >
                      {item.result.title}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
    </div>
  )
}

export default Sites