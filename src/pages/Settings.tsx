import React, { useEffect } from 'react'
import SitesManager from '../components/SitesManager'
import ApiForm from '../components/ApiForm'
import { useTypedSelector } from '../hooks/useTypedSelector'
import Button from '../UI/Button'
import { useActions } from '../hooks/useActions'

const Settings = () => {
  const { user } = useTypedSelector(state => state.auth)
  const { setUser, setData, setLists, setSearchResults, setSites, setLastSearch } = useActions()

  const onSignOutClick = () => {
    setUser(null)
    setData([])
    setLists([])
    setSearchResults([], 1)
    setSites([])
    setLastSearch('')
    localStorage.clear()
    console.clear()
  }

  useEffect(() => {
    document.title = `Settings - Films Lists`
  }, [])

  if (!user) {
    return null
  }

  return (
    <div className='flex-1 flex flex-col items-center px-3 py-3 gap-y-6'>
      {!(user.metaData && user.metaData?.searchApiSettings) ? (
        <ApiForm />
      )
        : <SitesManager />
      }
      <div className='mt-auto max-w-none xs:max-w-xs'>
        <div className='text-center text-lg font-medium mb-3 truncate'>{user.email}</div>
        <Button
          onClick={onSignOutClick}
          title='Sign out'
          type='button'
          className='border-myred'
        />
      </div>
    </div>
  )
}

export default Settings