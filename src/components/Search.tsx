import React, { useState, ChangeEvent, FormEvent } from 'react'
import Input from '../UI/Input'
import Button from '../UI/Button'
import { searchDataInfo } from '../API/searchDataInfo'
import { ISearchDataItem } from '../types/search'
import { useNavigate } from 'react-router-dom'
import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/useTypedSelector'

const Search = () => {
  const [search, setSearch] = useState('')
  const [searchError, setSearchError] = useState('')
  // const [loading, setLoading] = useState(false)
  // const [results, setResults] = useState<ISearchDataItem[]>([])
  const [isFocused, setIsFocused] = useState(false)
  const navigate = useNavigate()
  const { loading } = useTypedSelector(state => state.search)
  const { setResults, setLoading } = useActions()

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const search = value.trim()
    if (!search.length) {
      setSearchError('Field is required')
    } else if (search.length < 3) {
      setSearchError('Search must be longer than 2 characters')
    } else {
      setSearchError('')
    }
    setSearch(value)
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const trimmedSearch = search.trim()
    if (trimmedSearch.length >= 3) {
      console.log('submit search', trimmedSearch)
      searchDataInfo({
        title: trimmedSearch,
        setLoading,
        setResults
      })
      navigate('/search/' + trimmedSearch)
    }
  }

  const onSearchFocus = () => {
    setIsFocused(true)
  }

  const onSearchBlur = () => {
    setIsFocused(false)
    if (!search) {
      setSearchError('')
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className={`flex-1 flex gap-x-4 ${isFocused ? 'max-w-none' : 'max-w-sm'}`}
    >
      <Input
        onInputChange={onSearchChange}
        placeholder='Enter movie or series title'
        value={search}
        error={searchError}
        isFieldDirty={true}
        onBlur={onSearchBlur}
        onFocus={onSearchFocus}
        name='Search*'
        className='flex-1'
        py='py-3'
      />
      {loading
        ? <div>Loading...</div>
        : isFocused && (
          <div className=''>
            <Button
              title={'Search'}
              onClick={() => { }}
              disabled={!!searchError}
              type='submit'
              className='mt-[2px] px-6'
            />
          </div>
        )
      }
    </form>
  )
}

export default Search