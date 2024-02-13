import React, { ChangeEvent, MouseEvent, useRef, useState } from 'react'
import { IList } from '../types/lists'
import { ReactComponent as DeleteIcon } from '../assets/delete.svg'
import { ReactComponent as EditIcon } from '../assets/edit.svg'
import Button from './Button'
import { toast } from 'react-toastify'
import { useActions } from '../hooks/useActions'
import { deleteList } from '../API/deleteList'
import { useTypedSelector } from '../hooks/useTypedSelector'
import Loader from './Loader'
import Confirmation from './Confirmation'

interface AdditionalListProps {
  list: IList,
  onListClick: (e: MouseEvent, listId: number) => void,
  isDataInList: boolean,
}

const AdditionalList = ({ list, onListClick, isDataInList }: AdditionalListProps) => {
  const prevListName = useRef(list.name)
  const [isEdit, setIsEdit] = useState(false)
  const [listName, setListName] = useState(list.name)
  const [loading, setLoading] = useState(false)
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false)
  const { lists } = useTypedSelector(state => state.lists)
  const { fetchLists, updateListName, fetchData } = useActions()

  const handleEditVisible = () => {
    setIsEdit(prev => !prev)
  }

  const onListNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setListName(e.target.value)
  }

  const onUpdateListName = () => {
    const trimmedListName = listName.trim()
    if (!trimmedListName.length) {
      toast.error('List name cant be empty')
      return;
    }
    if (trimmedListName !== prevListName.current) {
      updateListName(list.id, trimmedListName, setLoading, lists)
    }
    setIsEdit(false)
  }

  const handleConfirmModalVisible = () => {
    setIsConfirmModalVisible(prev => !prev)
  }

  const onDeleteList = async () => {
    await deleteList(list.id, setLoading)
    fetchLists()
    fetchData()
    setIsEdit(false)
    setIsConfirmModalVisible(false)
  }

  if (loading) {
    return (
      <Loader size='24' />
    )
  }

  return (
    <div key={list.id} className='flex gap-x-4 items-center'>
      <div
        className={`hidden xs:flex border-yellow-400 border-2 h-5 w-5 cursor-pointer items-center justify-center`}
        onClick={(e) => onListClick(e, list.id)}
      >
        <div className={`${isDataInList ? 'bg-yellow-400' : 'bg-transparent'} h-3 w-3`} />
      </div>
      {isEdit ? (
        <div className='flex-1 flex gap-x-4 items-center'>
          <input
            type="text"
            value={listName}
            onChange={onListNameChange}
            className='flex-1 outline-none bg-inherit text-white border-b-[1px] border-white py-1'
          />
          <div className='flex items-center gap-x-2'>
            <Button
              onClick={onUpdateListName}
              title='Save'
              p='py-[2px]'
              className='px-1 w-[70px] hidden xs:block'
            />
            <div
              className='block xs:hidden text-sm rounded-lg border-[1px] border-myblue px-2 py-[6px]'
              onClick={onUpdateListName}
            >
              Save
            </div>
            <div
              className='bg-mygray2 rounded-full p-1 flex justify-center items-center hover:cursor-pointer'
              onClick={handleConfirmModalVisible}
            >
              <DeleteIcon className='h-6 w-6 fill-myred' />
            </div>
          </div>
        </div>
      ) : (
        <>
          <div
            className={`xs:hidden border-yellow-400 border-2 h-5 w-5 cursor-pointer flex items-center justify-center`}
            onClick={(e) => onListClick(e, list.id)}
          >
            <div className={`${isDataInList ? 'bg-yellow-400' : 'bg-transparent'} h-3 w-3`} />
          </div>
          <div
            className='flex-1 font-medium truncate cursor-help'
            title={listName}
          >
            {listName}
          </div>
          <EditIcon
            onClick={handleEditVisible}
            className='h-6 w-6 fill-white hover:cursor-pointer'
          />
        </>
      )}

      {isConfirmModalVisible && (
        <Confirmation
          title='If you delete this list, any unsaved data associated with it will be permanently removed.'
          onConfirm={onDeleteList}
          onClose={handleConfirmModalVisible}
        />
      )}
    </div>
  )
}

export default AdditionalList