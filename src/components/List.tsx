import React, { useMemo } from 'react'
import { useTypedSelector } from '../hooks/useTypedSelector'
import PreviewItem from './PreviewItem'
import { MediaTypeFilterOptions } from '../types/data'

interface IListProps {
  listId: number,
  filterByTitle: string,
  mediaTypeFilter: MediaTypeFilterOptions,
}

const List = ({ listId, filterByTitle, mediaTypeFilter }: IListProps) => {
  const { data } = useTypedSelector(state => state.data)
  const sortedData = useMemo(() => {
    const trimmedFilterByTitle = filterByTitle.trim().toLowerCase()
    const sortedByListId = data.filter(item => !!item.inLists[listId])
    const sortedByMediaType = mediaTypeFilter.type === 'all'
      ? sortedByListId
      : sortedByListId.filter(item => item.mediaType === mediaTypeFilter.type)
    const sortedByTitle = trimmedFilterByTitle
      ? sortedByMediaType.filter(item => item.title.toLowerCase().includes(trimmedFilterByTitle))
      : sortedByMediaType
    return [...sortedByTitle].sort((a, b) => +new Date(b.inLists[listId] || 0) - +new Date(a.inLists[listId] || 0))
  }, [data, listId, filterByTitle, mediaTypeFilter])

  if (!sortedData.length) {
    return <div className='flex-1 text-center text-xl font-medium py-6'>
      {filterByTitle ? 'No found results.' : 'List is empty.'}
    </div>
  }

  return (
    <div className={`w-full grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7
      3xl:grid-cols-8 items-stretch justify-center md:justify-normal gap-x-3 gap-y-3
    `}>
      {sortedData.map(item => (
        <PreviewItem
          item={item}
          sitesResults={item.links}
          key={item.id}
        />
      ))}
    </div>
  )
}

export default List