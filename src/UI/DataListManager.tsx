import React, { useState, useEffect } from 'react'
import { ReactComponent as BookmarkIcon } from '../assets/DataListManagerIcons/bookmark.svg'
import { ReactComponent as HeartIcon } from '../assets/DataListManagerIcons/heart.svg'
import { ReactComponent as PlayIcon } from '../assets/DataListManagerIcons/play.svg'
import { ReactComponent as SuccessIcon } from '../assets/DataListManagerIcons/success.svg'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { IDataItemWithLinks } from '../types/data'
import { ILink, ISearchDataItem } from '../types/search'
import { useActions } from '../hooks/useActions'
import { toast } from 'react-toastify'
import { saveDataToSb } from '../API/saveDataToSb'
import { updateDataOnSb } from '../API/updateDataOnSb'
import { deleteDataOnSb } from '../API/deleteDataOnSb'

interface DataListManagerProps {
  searchDataItem: ISearchDataItem,
  sitesResults: ILink[],
}

const DataListManager = ({ searchDataItem, sitesResults }: DataListManagerProps) => {
  const { fetchData } = useActions()
  const { lists } = useTypedSelector(state => state.lists)
  const { data } = useTypedSelector(state => state.data)
  const { user } = useTypedSelector(state => state.auth)
  const [currentData, setCurrentData] = useState<IDataItemWithLinks | null>(null)

  const onListClick = async (listId: number) => {
    if (!user) {
      return;
    }
    if (!currentData) {
      if (!sitesResults.length) {
        toast.error('You need to search on sites')
        return;
      }
      await saveDataToSb({
        ...searchDataItem,
        links: sitesResults.filter(site => site.result),
        listsIds: [listId],
        id: 999,
      }, user.id)
    } else {
      if (currentData.listsIds.includes(listId)) {
        const filteredLists = currentData.listsIds.filter(l => l !== listId)
        if (filteredLists.length) {
          await updateDataOnSb(currentData.id, filteredLists)
        } else {
          await deleteDataOnSb(currentData.id)
          setCurrentData(null)
        }
      } else if (currentData.listsIds.length) {
        await updateDataOnSb(currentData.id, [...currentData.listsIds, listId])
      } else {
        await saveDataToSb(currentData, user.id)
      }
    }
    fetchData()
  }

  const isDataInList = (listId: number) => {
    if (!currentData) {
      return false
    }
    return currentData.listsIds.includes(listId)
  }

  useEffect(() => {
    const currData = data.find(item => item.dataId === searchDataItem.dataId)
    if (currData) {
      setCurrentData(currData)
    }
  }, [searchDataItem.dataId, data])

  if (!lists.length) {
    return <div>Loading...</div>
  }

  return (
    <div className='grid grid-cols-4 text-small tracking-tighter rounded-b-md bg-mygray3'>
      <div
        className={`flex flex-col gap-y-1 justify-between items-center py-2 
          border-r-[2px] border-zinc-900 ${isDataInList(lists[0].id) ? 'bg-myblue' : ''}
          px-1 hover:cursor-pointer rounded-bl-md`
        }
        onClick={() => onListClick(lists[0].id)}
      >
        <HeartIcon className='h-7 w-7 fill-white' />
        <div>{lists[0].name}</div>
      </div>
      <div
        className={`flex flex-col gap-y-1 justify-between items-center py-2 
          border-r-[2px] border-zinc-900 ${isDataInList(lists[1].id) ? 'bg-myblue' : ''}
          px-1 hover:cursor-pointer`
        }
        onClick={() => onListClick(lists[1].id)}
      >
        <PlayIcon className='h-8 w-8 -mt-[2px] ml-1 fill-white' />
        <div>{lists[1].name}</div>
      </div>
      <div
        className={`flex flex-col gap-y-1 justify-between items-center py-2 
          border-r-[2px] border-zinc-900 ${isDataInList(lists[2].id) ? 'bg-myblue' : ''}
          px-1 hover:cursor-pointer`
        }
        onClick={() => onListClick(lists[2].id)}
      >
        <SuccessIcon className='h-7 w-7 fill-white' />
        <div className=''>{lists[2].name}</div>
      </div>
      <div
        className={`flex flex-col gap-y-1 justify-between items-center py-2 
            px-1 hover:cursor-pointer rounded-br-md ${isDataInList(lists[1].id) ? 'bg-yellow-500 text-black' : ''}
          `}
      // onClick={() => onListClick()}
      >
        <BookmarkIcon className={`h-7 w-7 ${isDataInList(lists[1].id) ? 'fill-black' : 'fill-white'}`} />
        <div className={`${isDataInList(lists[1].id) ? 'text-black font-medium' : 'text-white'} font-medium`}
        >
          Save
        </div>
      </div>
    </div>
  )
}

export default DataListManager