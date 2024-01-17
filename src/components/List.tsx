import React, { useMemo } from 'react'
import { useTypedSelector } from '../hooks/useTypedSelector'
import PreviewItem from './PreviewItem'
import { useNavigate } from 'react-router-dom'
import { MediaType } from '../types/search'

interface IListProps {
  listId: number,
  filterByTitle: string,
}

const List = ({ listId, filterByTitle }: IListProps) => {
  const { data } = useTypedSelector(state => state.data)
  const navigate = useNavigate()
  const sortedData = useMemo(() => {
    const sortedByListId = data.filter(item => !!item.inLists[listId])
    const trimmedFilterByTitle = filterByTitle.trim().toLowerCase()
    const sortedByTitle = trimmedFilterByTitle
      ? sortedByListId.filter(item => item.title.toLowerCase().includes(trimmedFilterByTitle))
      : sortedByListId
    return [...sortedByTitle].sort((a, b) => +new Date(b.inLists[listId] || 0) - +new Date(a.inLists[listId] || 0))
  }, [data, listId, filterByTitle])

  const onPreviewItemClick = (mediaType: MediaType, dataId: number) => {
    navigate(`/data/${mediaType}/${dataId}`)
  }

  if (!sortedData.length) {
    return <div className='flex-1 text-center text-xl font-medium py-6'>
      {filterByTitle ? 'No found results.' : 'List is empty.'}
    </div>
  }

  return (
    <div className={`w-full grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 3xl:grid-cols-8
      items-stretch justify-center md:justify-normal gap-x-3 gap-y-3
    `}>
      {sortedData.map(item => (
        <PreviewItem
          item={item}
          onItemClick={onPreviewItemClick}
          sitesResults={item.links}
          key={item.id}
        />
      ))}
    </div>
  )
}

export default List