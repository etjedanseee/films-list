import React from 'react'
import { ILink } from '../types/search'
import { ReactComponent as RejectedIcon } from '../assets/cancel.svg'
import { ReactComponent as SuccessIcon } from '../assets/success.svg'
import { useTypedSelector } from '../hooks/useTypedSelector'
import Loader from '../UI/Loader'

interface SitesProps {
  loading: boolean,
  results: ILink[],
}

const Sites = ({ results, loading }: SitesProps) => {
  const { sites } = useTypedSelector(state => state.sites)

  return (
    <div className='my-2 sm:my-4'>
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
                  <div className='truncate'>{item.site}</div>
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