import React, { useState, useEffect, ChangeEvent } from 'react'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { ICountDataInLists, IList } from '../types/lists'
import { calcCountDataInLists } from '../utils/calcCountDataInLists'
import List from '../components/List'
import { useDebounce } from '../hooks/useDebounce'
import Input from '../UI/Input'
import { useActions } from '../hooks/useActions'
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd'
import Loader from '../UI/Loader'
import ListsDropdown from '../UI/ListsDropdown'
import { ReactComponent as ArrowDownIcon } from '../assets/arrow-down.svg'
import MediaTypeFilter from '../components/MediaTypeFilter'
import { MediaTypeFilterOptions } from '../types/data'

const Lists = () => {
  const { data } = useTypedSelector(state => state.data)
  const { lists } = useTypedSelector(state => state.lists)
  const { user } = useTypedSelector(state => state.auth)
  const { updateLists } = useActions()
  const [currentList, setCurrentList] = useState<IList | null>(null)
  const [countDataInLists, setCountDataInLists] = useState<ICountDataInLists>({})
  const [filterByTitle, setFilterByTitle] = useState('')
  const debouncedFilterByTitle = useDebounce(filterByTitle, 500)
  const [additionalLists, setAdditionalLists] = useState<IList[]>([])
  const [loading, setLoading] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [mediaTypeFilter, setMediaTypeFilter] = useState<MediaTypeFilterOptions>({ title: 'All', type: 'all' })

  const onListClick = (list: IList) => {
    if (currentList && (list.id !== currentList.id)) {
      setCurrentList(list)
      localStorage.setItem('currentList', list.id.toString())
    }
    scrollToCoord(0, 0)
  }

  const scrollToCoord = (x: number, y: number) => {
    window.scrollTo({
      top: y,
      left: x,
      behavior: 'smooth',
    });
  }

  const onFilterByTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterByTitle(e.target.value)
  }

  const onCleanFilterByTitle = () => {
    setFilterByTitle('')
  }

  const onDragEnd = (result: DropResult) => {
    const { destination, draggableId, source } = result
    const currList = additionalLists.find(list => list.id === +draggableId)
    const destinationCondition = !destination || (destination.droppableId === source.droppableId && destination.index === source.index)
    if (destinationCondition || !currList || !user) {
      return;
    }
    const newAdditionalLists = Array.from(additionalLists)
    const [deleted] = newAdditionalLists.splice(source.index, 1)
    newAdditionalLists.splice(destination.index, 0, deleted)
    newAdditionalLists.forEach((list, i) => list.orderNum = i + 3)
    setAdditionalLists(newAdditionalLists)
    updateLists(newAdditionalLists, setLoading, user.id, lists)
  }

  const onMobileSelectList = (list: IList) => {
    onListClick(list)
    setIsDropdownOpen(false)
  }

  const onMediaTypeFilterClick = (type: MediaTypeFilterOptions) => {
    setMediaTypeFilter(type)
  }

  useEffect(() => {
    setAdditionalLists(lists.slice(3))
  }, [lists])

  useEffect(() => {
    if (data.length && lists.length) {
      setCountDataInLists(calcCountDataInLists(data, lists))
    }
  }, [data, lists])

  useEffect(() => {
    if (!lists.length) {
      return;
    }
    const localCurrentList = localStorage.getItem('currentList')
    if (localCurrentList) {
      const list = lists.find(l => l.id === +localCurrentList)
      if (list) {
        setCurrentList(list)
        return;
      }
    }
    setCurrentList(lists[0])
  }, [lists])

  useEffect(() => {
    if (!currentList) {
      return
    }
    const handleScroll = () => {
      localStorage.setItem('scrollPosition' + currentList.id, window.scrollY.toString())
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [currentList])

  useEffect(() => {
    if (currentList) {
      const localScrollPos = localStorage.getItem('scrollPosition' + currentList.id)
      if (localScrollPos != null) {
        scrollToCoord(0, +localScrollPos)
      }
    }
  }, [currentList])

  return (
    <div className='flex-1 py-2 xs:py-3 px-2 xs:px-4'>
      <div className='flex items-center justify-between gap-x-3 xs:gap-x-8 mb-2 xs:mb-3'>
        <MediaTypeFilter
          mediaTypeFilter={mediaTypeFilter}
          onMediaTypeFilterClick={onMediaTypeFilterClick}
        />
        <div className='max-w-none xs:max-w-[250px] w-full'>
          <Input
            value={filterByTitle}
            onInputChange={onFilterByTitleChange}
            placeholder='Filter by title'
            name='Filter'
            error=''
            isFieldDirty={false}
            py='py-2'
            isCanClean
            onClean={onCleanFilterByTitle}
          />
        </div>
      </div>
      <div className='md:hidden flex-1 flex justify-center'>
        {!!lists.length && currentList && (
          <ListsDropdown
            isDropdownOpen={isDropdownOpen}
            setIsDropdownOpen={setIsDropdownOpen}
            options={lists}
            selectedOption={currentList}
            setSelectedOption={onMobileSelectList}
            countDataInLists={countDataInLists}
          />
        )}
      </div>
      <div className='flex xl:gap-x-5 gap-x-3 min-h-full'>
        <ul className={`hidden md:flex sticky top-16 flex-col gap-y-2 h-full max-h-[400px] overflow-y-auto min-w-[170px]
            pt-1 pr-1
          `}>
          {!!lists.length && currentList && lists.slice(0, 3).map(list => (
            <li
              key={list.id}
              className={`font-medium flex gap-x-1 hover:cursor-pointer select-none
                ${currentList.id === list.id ? 'text-yellow-400' : 'text-white'}
              `}
              onClick={() => onListClick(list)}
            >
              <div title={list.name} className='truncate max-w-[150px] text-inherit'>{list.name}</div>
              <div className='text-inherit'>({countDataInLists[list.id] || 0})</div>
            </li>
          ))}
          {currentList && !loading ? (
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId='lists'>
                {provided => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className='flex flex-col gap-y-2 font-medium'
                  >
                    {!!additionalLists.length && additionalLists.map((list, index) => (
                      <Draggable
                        draggableId={list.id.toString()}
                        index={index}
                        key={list.id}
                      >
                        {provided2 => (
                          <li
                            key={list.id}
                            ref={provided2.innerRef}
                            {...provided2.draggableProps}
                            {...provided2.dragHandleProps}
                            className={`font-medium flex gap-x-1 hover:cursor-grab select-none
                                ${currentList.id === list.id ? 'text-yellow-400' : 'text-white'}
                              `}
                            onClick={() => onListClick(list)}
                          >
                            <div title={list.name} className='truncate max-w-[150px] text-inherit'>{list.name}</div>
                            <div className='text-inherit'>({countDataInLists[list.id]})</div>
                          </li>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          ) : (
            <Loader size='24' />
          )
          }
        </ul>
        {currentList && (
          <List
            listId={currentList.id}
            filterByTitle={debouncedFilterByTitle}
            mediaTypeFilter={mediaTypeFilter}
          />
        )}
      </div>
      <ArrowDownIcon
        className={`md:hidden fixed bottom-3 right-3 rotate-180 pt-[2px] fill-white w-8 h-8 rounded-full border-[1px] 
          border-gray-300 bg-bg1
        `}
        onClick={() => scrollToCoord(0, 0)}
      />
    </div>
  )
}

export default Lists