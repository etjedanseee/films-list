import React, { ChangeEvent, useRef, useState } from 'react'
import { ReactComponent as DeleteIcon } from '../assets/delete.svg'
import { ReactComponent as EditIcon } from '../assets/edit.svg'
import Button from '../UI/Button'
import { useFocus } from '../hooks/useFocus'

interface SiteItemProps {
  site: string,
  onUpdateSite: (prevSite: string, updatedSite: string) => void,
  onDeleteSite: (site: string) => void,
}

const SiteItem = ({ site, onDeleteSite, onUpdateSite }: SiteItemProps) => {
  const [isEdit, setIsEdit] = useState(false)
  const prevSite = useRef(site)
  const { inputRef, setInputFocus } = useFocus()
  const [siteValue, setSiteValue] = useState(site)

  const onEditClick = () => {
    setIsEdit(true)
    setTimeout(setInputFocus, 0)
  }

  const onSaveUpdatedSite = () => {
    const trimmedSite = siteValue.trim()
    if (siteValue !== prevSite.current && !!trimmedSite.length) {
      onUpdateSite(prevSite.current, trimmedSite)
    }
    setIsEdit(false)
  }

  const onCancelClick = () => {
    setIsEdit(false)
    setSiteValue(prevSite.current)
  }

  const onSiteValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSiteValue(e.target.value)
  }

  return (
    <div
      key={site}
      className='flex items-center justify-between gap-x-4 text-lg'
    >
      {isEdit ? (
        <div className='flex gap-x-2 items-center'>
          <input
            ref={inputRef}
            type="text"
            value={siteValue}
            onChange={onSiteValueChange}
            className='outline-none focus:font-medium bg-inherit text-white text-lg font-medium border-b-[1px] border-white py-1'
          />
          <Button
            onClick={onSaveUpdatedSite}
            title='Save'
            p='py-[2px]'
            className='px-1'
          />
          <button
            className='rounded-md border-2 border-myred px-3 py-[2px]'
            onClick={onCancelClick}
          >
            Cancel
          </button>
        </div>
      )
        : (
          <>
            <a
              href={`http://${site}`}
              target='_blank'
              rel="noreferrer"
              className='max-w-[200px] truncate'
              title={site}
            >
              {site}
            </a>
            <div className='flex items-center gap-x-6'>
              <EditIcon
                className='h-6 w-6 fill-white'
                onClick={onEditClick}
              />
              <DeleteIcon
                className='h-6 w-6 fill-myred'
                onClick={() => onDeleteSite(site)}
              />
            </div>
          </>
        )
      }
    </div>
  )
}

export default SiteItem