import React, { useState, useEffect, ChangeEvent } from 'react'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { ICountDataInLists, IList } from '../types/lists'
import { calcCountDataInLists } from '../utils/calcCountDataInLists'
import List from '../components/List'
import { useDebounce } from '../hooks/useDebounce'
import Input from '../UI/Input'

const Lists = () => {
  const { data } = useTypedSelector(state => state.data)
  const { lists } = useTypedSelector(state => state.lists)
  const [currentList, setCurrentList] = useState<IList | null>(null)
  const [countDataInLists, setCountDataInLists] = useState<ICountDataInLists>({})
  const [searchByTitle, setSearchByTitle] = useState('')
  const debouncedSearchByTitle = useDebounce(searchByTitle, 500)

  const onListClick = (list: IList) => {
    setCurrentList(list)
  }

  const onSearchByTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchByTitle(e.target.value)
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
        <div className='max-w-[250px] w-full'>
          <Input
            value={searchByTitle}
            onInputChange={onSearchByTitleChange}
            placeholder='Filter by title'
            name='Filter'
            error=''
            isFieldDirty={false}
            py='py-2'
          />
        </div>
      </div>
      <div className='flex gap-x-8'>
        <div className='flex flex-col gap-y-2'>
          {!!lists.length && currentList && lists.map(list => (
            <div
              key={list.id}
              className={`font-medium flex gap-x-1 hover:cursor-pointer
                ${currentList.id === list.id ? 'text-yellow-500' : 'text-white'}
              `}
              onClick={() => onListClick(list)}
            >
              <div title={list.name} className='truncate max-w-[150px] text-inherit'>{list.name}</div>
              <div className='text-inherit'>({countDataInLists[list.id]})</div>
            </div>
          ))}
        </div>
        {currentList && lists.find(list => list.id === currentList.id) && (
          <List
            listId={currentList.id}
            searchByTitle={debouncedSearchByTitle}
          />
        )}
      </div>
    </div>
  )
}

export default Lists