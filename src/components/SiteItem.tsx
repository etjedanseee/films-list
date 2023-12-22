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
        <div className='flex-1 flex gap-x-3 justify-between items-center'>
          <input
            ref={inputRef}
            type="text"
            value={siteValue}
            onChange={onSiteValueChange}
            className='flex-1 outline-none focus:font-medium bg-inherit text-white text-base xs:text-lg font-medium border-b-[1px] border-white py-1'
          />
          <div className='flex gap-x-1 xs:gap-x-2 items-center'>
            <Button
              onClick={onSaveUpdatedSite}
              title='Save'
              p='py-[2px]'
              className='px-1 xs:block hidden'
            />
            <button
              className='xs:hidden rounded-md border-2 border-myblue px-[6px] xs:px-3 py-1 text-xs xs:text-lg'
              onClick={onSaveUpdatedSite}
              type='button'
            >
              Save
            </button>
            <button
              className='rounded-md border-2 border-myred px-1 xs:px-3 py-1 text-xs xs:text-lg'
              onClick={onCancelClick}
              type='button'
            >
              Cancel
            </button>
          </div>
        </div>
      )
        : (
          <div className='flex-1 flex items-center justify-between gap-x-4 text-lg'>
            <a
              href={`http://${site}`}
              target='_blank'
              rel="noreferrer"
              className='flex-1 truncate'
              title={site}
            >
              {site}
            </a>
            <div className='flex items-center gap-x-4 xs:gap-x-6'>
              <EditIcon
                className='h-6 min-w-[24px] w-6 fill-white'
                onClick={onEditClick}
              />
              <DeleteIcon
                className='h-6 min-w-[24px] w-6 fill-myred'
                onClick={() => onDeleteSite(site)}
              />
            </div>
          </div>
        )
      }
    </div>
  )
}

export default SiteItem