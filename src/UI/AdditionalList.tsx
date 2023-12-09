import React, { ChangeEvent, MouseEvent, useRef, useState } from 'react'
import { IList } from '../types/lists'
import { ReactComponent as DeleteIcon } from '../assets/delete.svg'
import { ReactComponent as EditIcon } from '../assets/edit.svg'
import Button from './Button'
import { toast } from 'react-toastify'
import { updateListName } from '../API/updateListName'
import { useActions } from '../hooks/useActions'

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
  const { fetchLists } = useActions()

  const handleEditVisible = () => {
    setIsEdit(prev => !prev)
  }

  const onListNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setListName(e.target.value)
  }

  const onUpdateListname = async () => {
    const trimmedListName = listName.trim()
    if (!trimmedListName.length) {
      toast.error('List name cant be empty')
      return;
    }
    if (trimmedListName !== prevListName.current) {
      await updateListName(list.id, trimmedListName, setLoading)
      fetchLists()
    }
    setIsEdit(false)
  }

  const onDeleteList = () => {
    //
  }

  if (loading) {
    return <div className='py-2 text-center'>Loading...</div>
  }

  return (
    <div key={list.id} className='flex gap-x-4 items-center'>
      <div
        className={`border-yellow-400 border-2 h-5 w-5 cursor-pointer flex items-center justify-center`}
        onClick={(e) => onListClick(e, list.id)}
      >
        <div className={`${isDataInList ? 'bg-yellow-400' : 'bg-transparent'} h-3 w-3`} />
      </div>
      {isEdit ? (
        <div className='flex gap-x-2 items-center'>
          <input
            type="text"
            value={listName}
            onChange={onListNameChange}
            className='outline-none bg-inherit text-white border-b-[1px] border-white py-1'
          />
          <Button
            onClick={onUpdateListname}
            title='Save'
            p='py-[2px]'
            className='px-1'
          />
          <div
            className='bg-mygray2 rounded-full p-1 flex justify-center items-center hover:cursor-pointer'
            onClick={onDeleteList}
          >
            <DeleteIcon className='h-6 w-6 fill-myred' />
          </div>
        </div>
      ) : (
        <>
          <div className='flex-1 font-medium'>{listName}</div>
          <EditIcon
            onClick={handleEditVisible}
            className='h-6 w-6 fill-white hover:cursor-pointer'
          />
        </>
      )}
    </div>
  )
}

export default AdditionalList