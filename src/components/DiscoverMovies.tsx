import React, { useEffect } from 'react'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { useActions } from '../hooks/useActions'
import PreviewItem from './PreviewItem'
import Pagination from '../UI/Pagination'
import Loader from '../UI/Loader'
import DiscoverDataTypeDropdown from './DiscoverDataTypeDropdown'
import { moviesResultsTypeArr } from '../utils/consts'

const DiscoverMovies = () => {
  const { page, results, resultsType, totalPages, loading } = useTypedSelector(state => state.discover)
  const { fetchDiscoverDataHelper, setDiscoverLoading, setDiscoverTotalPages, setDiscoverPage, setDiscoverResultsType } = useActions()

  const onPageClick = (p: number) => {
    if (p !== page) {
      fetchDiscoverDataHelper({
        page: p,
        setLoading: setDiscoverLoading,
        setTotalPages: setDiscoverTotalPages,
        setPage: setDiscoverPage,
        resultsType,
      })
    }
  }

  useEffect(() => {
    fetchDiscoverDataHelper({
      page,
      setLoading: setDiscoverLoading,
      setTotalPages: setDiscoverTotalPages,
      setPage: setDiscoverPage,
      resultsType,
    })
  }, [resultsType, page])

  return (
    <div className='pt-2 px-2'>
      <DiscoverDataTypeDropdown
        currentResultsType={resultsType}
        options={moviesResultsTypeArr}
        onSelectOption={setDiscoverResultsType}
      />
      {loading ? (
        <div className='flex py-20 justify-center'><Loader size='60' /></div>
      )
        : (
          <>
            <div className={`w-full grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 
              2xl:grid-cols-7 3xl:grid-cols-8 items-stretch justify-center md:justify-normal gap-x-3 gap-y-3
              `}
            >
              {!!results.length && results.map(item => (
                <PreviewItem
                  item={item}
                  key={`${item.dataId}_${item.mediaType}`}
                />
              ))}
            </div>
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageClick={onPageClick}
            />
          </>
        )
      }
    </div >
  )
}

export default DiscoverMovies