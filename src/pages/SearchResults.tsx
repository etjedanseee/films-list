import React, { useEffect } from 'react'
import { useTypedSelector } from '../hooks/useTypedSelector'
import Loader from '../UI/Loader'
import PreviewItem from '../components/PreviewItem'
import { useActions } from '../hooks/useActions'
import { searchDataInfo } from '../API/searchDataInfo'

const SearchResults = () => {
  const { loading, results, page, totalPages, lastSearch } = useTypedSelector(state => state.search)
  const { setSearchPage, setSearchLoading, setSearchResults, setSearchTotalPages } = useActions()

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const body = document.body;
      const html = document.documentElement;
      const docHeight = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      );
      const windowBottom = windowHeight + window.scrollY;
      if (windowBottom >= (docHeight - 100) && !loading) {
        if ((page < totalPages) && (page < 5) && lastSearch) {
          searchDataInfo({
            title: lastSearch,
            page: page + 1,
            setLoading: setSearchLoading,
            setSearchResults,
            setSearchTotalPages,
          })
          setSearchPage(page + 1);
        }
      }
    };
    window.removeEventListener('scroll', handleScroll);
    if (page === 5 || page === totalPages) {
      return;
    }
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading, lastSearch, page, totalPages])

  if (loading && page === 1) {
    return (
      <div className='flex-1 flex justify-center items-center'><Loader size='80' /></div>
    )
  }

  return (
    <div className='px-2'>
      {!!results.length ? (
        <div className='mb-3 text-xl font-medium mt-1'>Results:</div>
      )
        : (
          <div className='text-xl font-medium mt-3'>No results found. Note: try search in English.</div>
        )
      }
      <div className={`w-full grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6
          2xl:grid-cols-7 3xl:grid-cols-8 items-stretch justify-center md:justify-normal gap-x-3 gap-y-3
        `}>
        {!!results.length && results.map(res => (
          <PreviewItem
            item={res}
            key={res.dataId + res.title + res.fullPosterUrl + res.releaseDate + res.mediaType}
          />
        ))}
      </div>
      {loading && page > 1 && (
        <div className='mt-4 flex-1 flex justify-center items-center'><Loader size='64' /></div>
      )}
    </div>
  )
}

export default SearchResults