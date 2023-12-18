import React, { ChangeEvent, useState } from 'react'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { ReactComponent as CloseIcon } from '../assets/cancel.svg'
import SiteItem from './SiteItem'
import { updateUserSites } from '../API/updateUserSites'
import { useActions } from '../hooks/useActions'
import Input from '../UI/Input'
import Button from '../UI/Button'
import { removeHttpFromUrl } from '../utils/removeHttpsFromUrl'
import Loader from '../UI/Loader'


const SitesManager = () => {
  const { sites } = useTypedSelector(state => state.sites)
  const { user } = useTypedSelector(state => state.auth)
  const [loading, setLoading] = useState(false)
  const { fetchSites } = useActions()
  const [isAddNewSite, setIsAddNewSite] = useState(false)
  const [newSiteValue, setNewSiteValue] = useState('')
  const [newSiteValueError, setNewSiteValueError] = useState('')

  const onUpdateSite = async (prevSite: string, updatedSite: string) => {
    if (!user) {
      return;
    }
    const removedUrlUpdatedSite = removeHttpFromUrl(updatedSite)
    const updatedSites = sites.map(s => s === prevSite ? removedUrlUpdatedSite : s)
    await updateUserSites(user.id, updatedSites, setLoading)
    fetchSites()
  }

  const onDeleteSite = async (site: string) => {
    if (!user || sites.length === 1) {
      return;
    }
    const updatedSites = sites.filter(s => s !== site)
    await updateUserSites(user.id, updatedSites, setLoading)
    fetchSites()
  }

  const onAddNewSite = async (site: string) => {
    const removedUrlUpdatedSite = removeHttpFromUrl(site)
    if (!user || newSiteValueError || sites.includes(removedUrlUpdatedSite)) {
      return;
    }
    const updatedSites = [...sites, removedUrlUpdatedSite]
    await updateUserSites(user.id, updatedSites, setLoading)
    fetchSites()
    setIsAddNewSite(false)
    setNewSiteValue('')
    setNewSiteValueError('')
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

  if (loading) {
    return (
      <div className='flex-1 flex justify-center items-center'><Loader size='80' /></div>
    )
  }

  return (
    <div>
      <div className='text-2xl font-medium mb-3'>Your sites:</div>
      <div className='flex flex-col gap-y-2 font-medium max-w-xs mb-4'>
        {!!sites.length && sites.map(site => (
          <SiteItem
            site={site}
            key={site}
            onDeleteSite={onDeleteSite}
            onUpdateSite={onUpdateSite}
          />
        ))}
      </div>

      {isAddNewSite && (
        <div className='mt-4 flex items-start gap-x-4 mb-4'>
          <Input
            error={newSiteValueError}
            name='Site url'
            onInputChange={onNewSiteValueChange}
            isFieldDirty={true}
            placeholder='Enter site url'
            value={newSiteValue}
            className='min-w-[200px]'
            py='py-2'
          />
          <div>
            <Button
              onClick={() => onAddNewSite(newSiteValue)}
              title='Add'
              className='py-[6px]'
            />
          </div>
        </div>
      )}

      {sites.length < 10 && (
        <div
          className='flex items-center gap-x-3 font-medium'
          onClick={handleIsAddNewSite}>
          <CloseIcon className='rotate-45 fill-white h-5 w-5' />
          <div className='text-lg'>Add new site</div>
        </div>)
      }
    </div >
  )
}

export default SitesManager