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
    <div className='xs:mt-3 font-medium'>
      <div className='mb-3 xs:mb-5 leading-tight text-xl xs:max-w-lg m-auto xs:pl-6'>This is your google account settings to search movie / series on your sites. Copy and paste it from guide (<a href='https://docs.google.com/document/d/1UrjssVFoUaaIBy29jNmxIzbs1b3pSWQh6I6ECwx6emA/edit' target='_blank' rel="noreferrer" title='guide' className='underline'>link</a>) p18, p14.</div>
      <form
        onSubmit={onSubmit}
        className='flex flex-col gap-y-2 max-w-none xs:max-w-sm m-auto'
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
        <div className='flex justify-center'>
          <Button
            title='Save'
            onClick={() => { }}
            type='submit'
            p='py-1'
            className='max-w-none xs:max-w-[180px]'
          />
        </div>
      </form>
    </div>
  )
}

export default ApiForm