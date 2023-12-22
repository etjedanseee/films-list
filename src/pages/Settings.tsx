import React from 'react'
import SitesManager from '../components/SitesManager'
import ApiForm from '../components/ApiForm'
import { useTypedSelector } from '../hooks/useTypedSelector'

const Settings = () => {
  const { user } = useTypedSelector(state => state.auth)

  if (!user) {
    return null
  }

  return (
    <div className='flex-1 flex flex-col px-3 py-3 gap-y-6'>
      {!(user.metaData && user.metaData?.searchApiSettings) ? (
        <ApiForm />
      )
        : <SitesManager />
      }
    </div>
  )
}

export default Settings