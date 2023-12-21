import React, { useState, useEffect } from 'react'
import { useTypedSelector } from '../hooks/useTypedSelector'
import PreviewItem from './PreviewItem'
import { useNavigate } from 'react-router-dom'
import { IDataItemWithLinks } from '../types/data'

interface IListProps {
  listId: number,
  searchByTitle: string,
}

const List = ({ listId, searchByTitle }: IListProps) => {
  const { data } = useTypedSelector(state => state.data)
  const navigate = useNavigate()
  const [sortedData, setSortedData] = useState<IDataItemWithLinks[]>([])

  const onPreviewItemClick = (dataId: number) => {
    navigate('/data/' + dataId)
  }

  useEffect(() => {
    const sortedByListId = data.filter(item => !!item.inLists[listId])
    const trimmedSearchByTitle = searchByTitle.trim().toLowerCase()
    const sortedByTitle = trimmedSearchByTitle
      ? sortedByListId.filter(item => item.title.toLowerCase().includes(trimmedSearchByTitle))
      : sortedByListId
    const sortedData = [...sortedByTitle].sort((a, b) => {
      const aDate = new Date(a.inLists[listId] || 0)
      const bDate = new Date(b.inLists[listId] || 0)
      return +bDate - +aDate
    })
    setSortedData(sortedData)
  }, [data, listId, searchByTitle])

  if (!sortedData.length) {
    return <div className='flex-1 text-center text-xl font-medium py-6'>
      {searchByTitle ? 'No found results.' : 'List is empty.'}
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