import React from 'react'
import SitesManager from '../components/SitesManager'
import ApiForm from '../components/ApiForm'
import { useTypedSelector } from '../hooks/useTypedSelector'
import Button from '../UI/Button'
import { useActions } from '../hooks/useActions'

const Settings = () => {
  const { user } = useTypedSelector(state => state.auth)
  const { setUser } = useActions()

  if (!user) {
    return null
  }

  const onSignOutClick = () => {
    setUser(null)
    localStorage.clear()
  }

  return (
    <div className='flex-1 flex flex-col px-3 py-3 gap-y-6'>
      {!(user.metaData && user.metaData?.searchApiSettings) ? (
        <ApiForm />
      )
        : <SitesManager />
      }
      <div className='mt-auto max-w-none xs:max-w-xs'>
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