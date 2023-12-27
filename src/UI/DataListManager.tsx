import React, { useState, useEffect, MouseEvent, useRef } from 'react'
import { ReactComponent as BookmarkIcon } from '../assets/DataListManagerIcons/bookmark.svg'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { IDataItemWithLinks, IInLists } from '../types/data'
import { ILink, IPreviewDataItem } from '../types/search'
import { saveDataToSb } from '../API/saveDataToSb'
import { updateDataOnSb } from '../API/updateDataOnSb'
import { deleteDataOnSb } from '../API/deleteDataOnSb'
import SavedListsModal from './SavedListsModal'
import DataListManagetItem from './DataListManagetItem'
import Loader from './Loader'
import { updateDataLinksOnSb } from '../API/updateDataLinksOnSb'

interface DataListManagerProps {
  previewDataItem: IPreviewDataItem,
  sitesResults: ILink[],
  isHideListsTitles?: boolean,
}

const DataListManager = ({ previewDataItem, sitesResults, isHideListsTitles = false }: DataListManagerProps) => {
  const { lists } = useTypedSelector(state => state.lists)
  const { data } = useTypedSelector(state => state.data)
  const { user } = useTypedSelector(state => state.auth)
  const [inLists, setInLists] = useState<IInLists>({})
  const [id, setId] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [isSaveToListsModalVisible, setIsSaveToListsModalVisible] = useState(false)
  const isNeedToUpdateData = useRef(true)
  const isDataInSavedList = Object.keys(inLists).find(key => lists.slice(3).find(a => a.id === +key))

  const onListClick = async (e: MouseEvent, listId: number) => {
    e.stopPropagation()
    if (!user) {
      return;
    }
    const listsEntries = Object.entries(inLists)
    const currentList = { [listId]: new Date().toISOString() }
    if (!listsEntries.length) {
      const itemWithLinks: IDataItemWithLinks = {
        ...previewDataItem,
        links: sitesResults,
        inLists: currentList,
        id: 999,
      }
      setInLists(currentList)
      await saveDataToSb(itemWithLinks, user.id, setLoading, setId)
    } else if (id != null) {
      if (inLists[listId]) {
        const filteredEntries = listsEntries.filter(entr => +entr[0] !== listId)
        const filteredLists = Object.fromEntries(filteredEntries)
        if (filteredEntries.length) {
          setInLists(filteredLists)
          await updateDataOnSb(id, filteredLists, setLoading)
        } else {
          const currId = id
          setInLists({})
          setId(null)
          await deleteDataOnSb(currId, setLoading)
        }
      } else {
        const updatedInLists = { ...inLists, ...currentList }
        setInLists(updatedInLists)
        await updateDataOnSb(id, updatedInLists, setLoading)
      }
    }
  }

  const handleSaveToListsModalVisible = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    setIsSaveToListsModalVisible(prev => !prev)
  }

  const onSaveClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    handleSaveToListsModalVisible(e)
  }

  const isDataInList = (listId: number) => {
    return !!inLists[listId]
  }

  useEffect(() => {
    if (isNeedToUpdateData.current) {
      const currData = data.find(item => item.dataId === previewDataItem.dataId && item.title === previewDataItem.title)
      if (currData) {
        setInLists(currData.inLists)
        setId(currData.id)
        isNeedToUpdateData.current = false
      }
    }
  }, [previewDataItem, data])

  useEffect(() => {
    if (id && previewDataItem && sitesResults.length) {
      const itemInData = data.find(i => i.id === id)
      if (!itemInData || (itemInData && !itemInData.links.length)) {
        updateDataLinksOnSb(id, sitesResults, setLoading)
      }
    }
  }, [previewDataItem, sitesResults, data, id])

  return (
    <>
      {!lists.length || loading ? (
        <>
          {isHideListsTitles ? (
            <div className='py-[6px] bg-mygray3 flex justify-center items-center'>
              <Loader size='28' />
            </div>
          )
            : (
              <div className='py-2 bg-mygray3 flex justify-center items-center'>
                <Loader size='48' />
              </div>
            )
          }
        </>
      )
        : (
          <div className='grid grid-cols-4 text-small tracking-tighter rounded-b-md bg-mygray3'>
            <DataListManagetItem
              isDataInList={isDataInList(lists[0].id)}
              isHideListsTitles={isHideListsTitles}
              list={lists[0]}
              onListClick={onListClick}
            />
            <DataListManagetItem
              isDataInList={isDataInList(lists[1].id)}
              isHideListsTitles={isHideListsTitles}
              list={lists[1]}
              onListClick={onListClick}
            />
            <DataListManagetItem
              isDataInList={isDataInList(lists[2].id)}
              isHideListsTitles={isHideListsTitles}
              list={lists[2]}
              onListClick={onListClick}
            />
            <div
              className={`flex flex-col gap-y-1 justify-between items-center ${isHideListsTitles ? 'py-1' : 'py-2'} 
              px-1 hover:cursor-pointer rounded-br-md 
              ${isDataInSavedList ? 'bg-yellow-500 text-black' : ''}
            `}
              onClick={onSaveClick}
              title={isDataInSavedList ? 'Saved' : 'Save'}
            >
              <BookmarkIcon className={`h-7 w-7 ${isDataInSavedList ? 'fill-mygray' : 'fill-white'}`} />
              {!isHideListsTitles && (
                <div className={`${isDataInSavedList ? 'text-black font-medium' : 'text-white'} font-medium`}>
                  Save
                </div>
              )}
            </div>
          </div>
        )
      }
      {isSaveToListsModalVisible && (
        <SavedListsModal
          handleClose={e => handleSaveToListsModalVisible(e)}
          additionalLists={lists.slice(3)}
          onListClick={onListClick}
          dataInLists={inLists}
        />
      )}
    </>
  )
}

export default DataListManager