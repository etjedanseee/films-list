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
    <div className='mt-6'>
      {loading ? (
        <div className='flex flex-col gap-y-1'>
          {!!sites.length && sites.map(site => (
            <div key={site} className='flex items-center gap-x-4'>
              <div className='flex justify-center items-center'><Loader size='6' /></div>
              <div>{site}</div>
            </div>
          ))}
        </div>
      )
        : (
          <>
            {!!results.length && results.map(item => (
              <div key={item.site} className='flex items-center gap-x-4'>
                {item.result ? (
                  <SuccessIcon className='h-7 w-7 fill-green-500' />
                ) : (
                  <RejectedIcon className='h-7 w-7 fill-myred' />
                )}<div></div>
                <div className='flex flex-col'>
                  <div>{item.site}</div>
                  {!!item.result && (
                    <a
                      className='underline'
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
          </>
        )}
    </div>
  )
}

export default Sites