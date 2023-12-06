import React, { useState, useEffect } from 'react'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { ICountDataInLists, IList } from '../types/lists'
import { calcCountDataInLists } from '../utils/calcCountDataInLists'
import List from '../components/List'

const Lists = () => {
  const { data } = useTypedSelector(state => state.data)
  const { lists } = useTypedSelector(state => state.lists)
  const [currentList, setCurrentList] = useState<IList | null>(null)
  const [countDataInLists, setCountDataInLists] = useState<ICountDataInLists>({})

  const onListClick = (list: IList) => {
    setCurrentList(list)
  }

  useEffect(() => {
    if (data.length && lists.length) {
      setCountDataInLists(calcCountDataInLists(data, lists))
    }
  }, [data, lists])

  useEffect(() => {
    if (!currentList && lists.length) {
      setCurrentList(lists[0])
    }
  }, [lists, currentList])

  return (
    <div className='flex-1 py-3 px-4'>
      <div className='flex items-center justify-between gap-x-8 mb-3'>
        <div className='text-2xl font-medium'>Saved Lists</div>
        <div>search</div>
      </div>
      <div className='flex gap-x-8'>
        <div className='flex flex-col gap-y-2'>
          {!!lists.length && currentList && lists.map(list => (
            <div
              key={list.id}
              className={`font-medium ${currentList.id === list.id ? 'text-yellow-500' : 'text-white'}`}
              onClick={() => onListClick(list)}
            >
              {list.name} ({countDataInLists[list.id]})
            </div>
          ))}
        </div>
        {currentList && lists.find(list => list.id === currentList.id) && (
          <List listId={currentList.id} />
        )}
      </div>
    </div>
  )
}

export default Lists