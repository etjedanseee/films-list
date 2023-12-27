import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useTypedSelector } from '../hooks/useTypedSelector'
import Input from '../UI/Input'
import Button from '../UI/Button'
import { useActions } from '../hooks/useActions'

const ApiForm = () => {
  const { user } = useTypedSelector(state => state.auth)
  const { updateUserMetadata } = useActions()
  const [searchApiKey, setSearchApiKey] = useState('')
  const [searchEngineId, setSearchEngineId] = useState('')

  const handleSearchApiKeyChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchApiKey(e.target.value)
  }

  const handleSearchEngineIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchEngineId(e.target.value)
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!user) {
      return;
    }
    if (searchApiKey && searchEngineId) {
      updateUserMetadata(user, {
        searchApiSettings: {
          searchApiKey: searchApiKey.trim(),
          searchEngineId: searchEngineId.trim(),
        }
      })
    }
  }

  return (
    <div className='font-medium'>
      <div className='mb-3 leading-tight text-xl'>This is your google account settings to search movie / series on your sites. Copy and paste it from guide p18, p14.</div>
      <form
        onSubmit={onSubmit}
        className='flex flex-col gap-y-2'
      >
        <Input
          value={searchApiKey}
          error=''
          isFieldDirty={false}
          name='Search API key'
          onInputChange={handleSearchApiKeyChange}
          placeholder='Enter search api key'
          py='py-2'
        />
        <Input
          value={searchEngineId}
          error=''
          isFieldDirty={false}
          name='Search engine id'
          onInputChange={handleSearchEngineIdChange}
          placeholder='Enter search engine id'
          py='py-2'
        />
        <Button
          title='Save'
          onClick={() => { }}
          type='submit'
          p='py-1'
        />
      </form>
    </div>
  )
}

export default ApiForm