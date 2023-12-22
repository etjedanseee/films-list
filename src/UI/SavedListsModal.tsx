import React, { MouseEvent, useState, ChangeEvent, useEffect } from 'react'
import { ReactComponent as CloseIcon } from '../assets/cancel.svg'
import { IList } from '../types/lists'
import Button from './Button'
import Input from './Input'
import { createList } from '../API/createList'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { useActions } from '../hooks/useActions'
import { IInLists } from '../types/data'
import AdditionalList from './AdditionalList'
import { toast } from 'react-toastify'

interface SaveToListsModalProps {
  handleClose: (e: MouseEvent<HTMLDivElement>) => void,
  additionalLists: IList[],
  dataInLists: IInLists,
  onListClick: (e: MouseEvent, listId: number) => void,
}

const SavedListsModal = ({ handleClose, additionalLists, dataInLists, onListClick }: SaveToListsModalProps) => {
  const { user } = useTypedSelector(state => state.auth)
  const { fetchLists } = useActions()
  const [isCreateNewList, setIsCreateNewList] = useState(false)
  const [newListName, setNewListName] = useState('')
  const [newListNameError, setNewListNameError] = useState('')

  const onNewListNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const name = value.trim()
    if (!name.length) {
      setNewListNameError('Field is required')
    } else {
      setNewListNameError('')
    }
    setNewListName(value)
  }

  const handleIsCreateNewList = () => {
    setIsCreateNewList(prev => !prev)
    setNewListNameError('')
    setNewListName('')
  }

  const onCreateNewList = async () => {
    const trimmedNewListName = newListName.trim()
    if (!trimmedNewListName.length) {
      toast.error('List must include name')
      return;
    }
    if (user) {
      const orderNum = additionalLists.length ? (additionalLists[additionalLists.length - 1].orderNum + 1) : 3
      await createList(trimmedNewListName, orderNum, user.id)
      fetchLists()
    }
    setIsCreateNewList(false)
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  return (
    <div
      className='fixed z-40 top-0 left-0 w-full h-full bg-black bg-opacity-80 flex items-center justify-center'
      onClick={e => handleClose(e)}
    >
      <div
        className='bg-mygray3 px-3 xs:px-8 py-4 rounded-xl opacity-100 text-base min-w-full xs:min-w-[400px]'
        onClick={e => e.stopPropagation()}
      >
        <div className='flex justify-between items-center mb-6'>
          <div className='font-bold text-2xl'>Save to...</div>
          <div onClick={handleClose}>
            <CloseIcon className='fill-white h-6 w-6' />
          </div>
        </div>
        <div className='flex flex-col gap-y-3 mb-6'>
          {additionalLists.length ? additionalLists.map(list => (
            <AdditionalList
              isDataInList={!!dataInLists[list.id]}
              list={list}
              onListClick={onListClick}
              key={list.id}
            />
          ))
            : <div className='font-medium'>You don't have additional lists.</div>
          }
        </div>
        {isCreateNewList && (
          <div className='flex justify-between items-start gap-x-2 xs:gap-x-4 mb-3'>
            <Input
              error={newListNameError}
              name='Name'
              onInputChange={onNewListNameChange}
              isFieldDirty={true}
              placeholder='Enter list name'
              value={newListName}
              className='w-full'
              titleBg='bg-bg2'
              py='py-2'
            />
            <Button
              onClick={onCreateNewList}
              title='Create'
              className='py-[6px] w-[120px]'
            />
          </div>
        )}
        <div
          className='flex items-center gap-x-2'
          onClick={handleIsCreateNewList}>
          <CloseIcon className={`${isCreateNewList ? 'rotate-0' : 'rotate-45'} fill-white h-5 w-5`} />
          <div className='text-lg'>{isCreateNewList ? 'Cancel' : 'Create new list'}</div>
        </div>
      </div>
    </div>
  )
}

export default SavedListsModal