import React, { useState, useEffect, MouseEvent, useRef } from 'react'
import { ReactComponent as BookmarkIcon } from '../assets/DataListManagerIcons/bookmark.svg'
import { ReactComponent as HeartIcon } from '../assets/DataListManagerIcons/heart.svg'
import { ReactComponent as PlayIcon } from '../assets/DataListManagerIcons/play.svg'
import { ReactComponent as SuccessIcon } from '../assets/DataListManagerIcons/success.svg'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { IInLists } from '../types/data'
import { ILink, ISearchDataItem } from '../types/search'
import { toast } from 'react-toastify'
import { saveDataToSb } from '../API/saveDataToSb'
import { updateDataOnSb } from '../API/updateDataOnSb'
import { deleteDataOnSb } from '../API/deleteDataOnSb'
import { listIdToInLists } from '../utils/listIdToInLists'
import SaveToListsModal from './SaveToListsModal'

interface DataListManagerProps {
  searchDataItem: ISearchDataItem,
  sitesResults: ILink[],
  isHideListsTitles?: boolean,
}

const DataListManager = ({ searchDataItem, sitesResults, isHideListsTitles = false }: DataListManagerProps) => {
  const { lists } = useTypedSelector(state => state.lists)
  const { data } = useTypedSelector(state => state.data)
  const { user } = useTypedSelector(state => state.auth)
  const [inLists, setInLists] = useState<IInLists[]>([])
  const [id, setId] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [isSaveToListsModalVisible, setIsSaveToListsModalVisible] = useState(false)
  const isNeedToUpdateData = useRef(true)

  const onListClick = async (e: MouseEvent, listId: number) => {
    e.stopPropagation()
    if (!user) {
      return;
    }
    const currentList = listIdToInLists(listId)
    if (!inLists.length) {
      if (!sitesResults.length) {
        toast.error('You need to search on sites')
        return;
      }
      const itemWithLinks = {
        ...searchDataItem,
        links: sitesResults,
        inLists: [currentList],
        id: 999,
      }
      setInLists([currentList])
      await saveDataToSb(itemWithLinks, user.id, setLoading, setId)
    } else if (id != null) {
      if (inLists.find(list => list.id === listId)) {
        const filteredLists = inLists.filter(l => l.id !== listId)
        if (filteredLists.length) {
          setInLists(filteredLists)
          await updateDataOnSb(id, filteredLists, setLoading)
        } else {
          const currId = id
          setInLists([])
          setId(null)
          await deleteDataOnSb(currId, setLoading)
        }
      } else {
        setInLists([...inLists, currentList])
        await updateDataOnSb(id, [...inLists, currentList], setLoading)
      }
    }
  }

  const handleSaveToListsModalVisible = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    setIsSaveToListsModalVisible(prev => !prev)
  }

  const onSaveClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    if (sitesResults.length) {
      handleSaveToListsModalVisible(e)
    } else {
      toast.error('You need to search on sites')
    }
  }

  const isDataInList = (listId: number) => {
    if (!inLists.length) {
      return false
    }
    return inLists.find(list => list.id === listId)
  }

  useEffect(() => {
    const currData = data.find(item => item.dataId === searchDataItem.dataId)
    if (isNeedToUpdateData.current && !id && currData) {
      setInLists(currData.inLists)
      setId(currData.id)
      isNeedToUpdateData.current = false
    }
  }, [searchDataItem.dataId, data, id])

  if (!lists.length || loading) {
    return (
      <div className='py-3 bg-mygray3 flex justify-center'>
        <div>Loading...</div>
      </div>
    )
  }

  return (
    <div className='grid grid-cols-4 text-small tracking-tighter rounded-b-md bg-mygray3'>
      <div
        className={`flex flex-col gap-y-1 justify-between items-center ${isHideListsTitles ? 'py-1' : 'py-2'}  
          border-r-[2px] border-zinc-900 ${isDataInList(lists[0].id) ? 'bg-myblue' : ''}
          px-1 hover:cursor-pointer rounded-bl-md`
        }
        onClick={(e) => onListClick(e, lists[0].id)}
        title={lists[0].name}
      >
        <HeartIcon className='h-7 w-7 fill-white' />
        {!isHideListsTitles && <div>{lists[0].name}</div>}
      </div>
      <div
        className={`flex flex-col gap-y-1 justify-between items-center ${isHideListsTitles ? 'py-1' : 'py-2'}  
          border-r-[2px] border-zinc-900 ${isDataInList(lists[1].id) ? 'bg-myblue' : ''}
          px-1 hover:cursor-pointer`
        }
        onClick={(e) => onListClick(e, lists[1].id)}
        title={lists[1].name}
      >
        <PlayIcon className='h-8 w-8 -mt-[2px] ml-1 fill-white' />
        {!isHideListsTitles && <div>{lists[1].name}</div>}
      </div>
      <div
        className={`flex flex-col gap-y-1 justify-between items-center ${isHideListsTitles ? 'py-1' : 'py-2'} 
          border-r-[2px] border-zinc-900 ${isDataInList(lists[2].id) ? 'bg-myblue' : ''}
          px-1 hover:cursor-pointer`
        }
        onClick={(e) => onListClick(e, lists[2].id)}
        title={lists[2].name}
      >
        <SuccessIcon className='h-7 w-7 fill-white' />
        {!isHideListsTitles && <div>{lists[2].name}</div>}
      </div>
      <div
        className={`flex flex-col gap-y-1 justify-between items-center ${isHideListsTitles ? 'py-1' : 'py-2'} 
            px-1 hover:cursor-pointer rounded-br-md 
            ${inLists.find(i => lists.slice(3).find(l => l.id === i.id))
            ? 'bg-yellow-500 text-black' : ''}
          `}
        onClick={onSaveClick}
        title={'Save'}
      >
        <BookmarkIcon
          className={`h-7 w-7
              ${inLists.find(i => lists.slice(3).find(a => a.id === i.id))
              ? 'fill-black' : 'fill-white'
            }`}
        />
        {!isHideListsTitles && (
          <div className={`
            ${inLists.find(i => lists.slice(3).find(a => a.id === i.id))
              ? 'text-black font-medium' : 'text-white'} font-medium
            `}
          >
            Save
          </div>
        )}
      </div>
      {isSaveToListsModalVisible && (
        <SaveToListsModal
          handleClose={e => handleSaveToListsModalVisible(e)}
          additionalLists={lists.slice(3)}
          onListClick={onListClick}
          dataInLists={inLists}
        />
      )}
    </div>
  )
}

export default DataListManager