import React, { useState, useEffect } from 'react'
import { useTypedSelector } from '../hooks/useTypedSelector'
import PreviewItem from './PreviewItem'
import { useNavigate } from 'react-router-dom'

interface IListProps {
  listId: number,
}

const List = ({ listId }: IListProps) => {
  const { data } = useTypedSelector(state => state.data)
  const navigate = useNavigate()
  const [sortedData, setSortedData] = useState(data)

  const onPreviewItemClick = (dataId: number) => {
    navigate('/data/' + dataId)
  }

  useEffect(() => {
    const filteredData = data.filter(item => item.inLists.find(i => i.id === listId))
    const sortedData = filteredData.sort((a, b) => {
      const aDate = new Date(a.inLists.find(i => i.id === listId)?.date || 0)
      const bDate = new Date(b.inLists.find(i => i.id === listId)?.date || 0)
      return +bDate - +aDate
    })
    setSortedData(sortedData)
  }, [data, listId])

  return (
    <div className='flex flex-wrap items-stretch gap-x-3 gap-y-4'>
      {!!sortedData.length && sortedData.map(item => (
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