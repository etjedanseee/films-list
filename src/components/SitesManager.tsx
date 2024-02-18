import React, { ChangeEvent, useEffect, useState } from 'react'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { ReactComponent as CloseIcon } from '../assets/cancel.svg'
import SiteItem from './SiteItem'
import { useActions } from '../hooks/useActions'
import Input from '../UI/Input'
import Button from '../UI/Button'
import { removeHttpFromUrl } from '../utils/removeHttpsFromUrl'
import Loader from '../UI/Loader'
import Confirmation from '../UI/Confirmation'
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd'

const SitesManager = () => {
  const { sites } = useTypedSelector(state => state.sites)
  const { user } = useTypedSelector(state => state.auth)
  const [loading, setLoading] = useState(false)
  const { updateUserSites } = useActions()
  const [isAddNewSite, setIsAddNewSite] = useState(false)
  const [newSiteValue, setNewSiteValue] = useState('')
  const [newSiteValueError, setNewSiteValueError] = useState('')
  const [isConfirmDeleteSiteVisible, setIsConfirmDeleteSiteVisible] = useState(false)
  const [siteToDelete, setSiteToDelete] = useState('')
  const [userSites, setUserSites] = useState<string[]>([])

  const onUpdateSite = (prevSite: string, updatedSite: string) => {
    if (!user) {
      return;
    }
    const removedUrlUpdatedSite = removeHttpFromUrl(updatedSite)
    const updatedSites = sites.map(s => s === prevSite ? removedUrlUpdatedSite : s)
    updateUserSites(user.id, updatedSites, setLoading)
  }

  const onDeleteSiteClick = (site: string) => {
    if (sites.length === 1) {
      return
    }
    setIsConfirmDeleteSiteVisible(true)
    setSiteToDelete(site)
  }

  const handleCloseDeleteSiteConfirmation = () => {
    setIsConfirmDeleteSiteVisible(false)
    setSiteToDelete('')
  }

  const onDeleteSite = (site: string) => {
    handleCloseDeleteSiteConfirmation()
    if (!user) {
      return;
    }
    const updatedSites = sites.filter(s => s !== site)
    updateUserSites(user.id, updatedSites, setLoading)
  }

  const onAddNewSite = (site: string) => {
    const removedUrlUpdatedSite = removeHttpFromUrl(site)
    if (!user || newSiteValueError || sites.includes(removedUrlUpdatedSite)) {
      return;
    }
    const updatedSites = [...sites, removedUrlUpdatedSite]
    updateUserSites(user.id, updatedSites, setLoading)
    handleIsAddNewSite()
  }

  const handleIsAddNewSite = () => {
    setIsAddNewSite(prev => !prev)
    setNewSiteValue('')
    setNewSiteValueError('')
  }

  const onNewSiteValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const trimmedSite = value.trim()
    if (!trimmedSite.length) {
      setNewSiteValueError('Field is required')
    } else {
      setNewSiteValueError('')
    }
    setNewSiteValue(value)
  }

  const onDragEnd = (result: DropResult) => {
    const { destination, draggableId, source } = result
    const currSite = sites.find(site => site === draggableId)
    const destinationCondition = !destination || (destination.droppableId === source.droppableId && destination.index === source.index)
    if (destinationCondition || !currSite || !user) {
      return;
    }
    const newUserSites = Array.from(userSites)
    const [deleted] = newUserSites.splice(source.index, 1)
    newUserSites.splice(destination.index, 0, deleted)
    updateUserSites(user.id, newUserSites, setLoading)
  }

  useEffect(() => {
    setUserSites(sites)
  }, [sites])

  if (loading || !userSites.length) {
    return (
      <div className='flex-1 flex justify-center items-center'><Loader size='80' /></div>
    )
  }

  return (
    <div className='max-w-full'>
      <div className='text-2xl font-medium mb-3'>Your sites:</div>
      <div className='flex flex-col gap-y-2 font-medium xs:max-w-xs mb-4'>
        {!!userSites.length && (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId='sites'>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`flex flex-col gap-y-2 font-medium 
                      ${snapshot.isDraggingOver ? 'border-myblue px-2 py-1 overflow-x-hidden border-2' : ''}
                  `}
                >
                  {userSites.map((site, index) => (
                    <Draggable
                      draggableId={site}
                      index={index}
                      key={site}
                    >
                      {provided2 => (
                        <SiteItem
                          site={site}
                          key={site}
                          onDeleteSite={onDeleteSiteClick}
                          onUpdateSite={onUpdateSite}
                          dragRef={provided2.innerRef}
                          draggableProps={provided2.draggableProps}
                          dragHandleProps={provided2.dragHandleProps}
                        />
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </div>

      {isAddNewSite && (
        <div className='my-4 flex items-start gap-x-4'>
          <Input
            error={newSiteValueError}
            name='Site url'
            onInputChange={onNewSiteValueChange}
            isFieldDirty={true}
            placeholder='Enter site url'
            value={newSiteValue}
            className='flex-1'
            py='py-2'
          />
          <div>
            <Button
              onClick={() => onAddNewSite(newSiteValue)}
              title='Add'
              className='py-[6px]'
              disabled={!newSiteValue.length}
            />
          </div>
        </div>
      )}

      <div
        className='flex items-center gap-x-3 font-medium hover:cursor-pointer'
        onClick={handleIsAddNewSite}
      >
        <CloseIcon className={`${isAddNewSite ? 'rotate-0' : 'rotate-45'} fill-white h-5 w-5`} />
        <div className='text-lg'>{isAddNewSite ? 'Cancel' : 'Add new site'}</div>
      </div>
      {isConfirmDeleteSiteVisible && (
        <Confirmation
          title='Confirm delete site'
          onClose={handleCloseDeleteSiteConfirmation}
          onConfirm={() => onDeleteSite(siteToDelete)}
        />
      )}
    </div >
  )
}

export default SitesManager