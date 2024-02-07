import React, { ChangeEvent, useEffect, useState } from 'react'
import { ILink } from '../types/search'
import { ReactComponent as RejectedIcon } from '../assets/cancel.svg'
import { ReactComponent as SuccessIcon } from '../assets/success.svg'
import { ReactComponent as EditIcon } from '../assets/edit.svg'
import Input from '../UI/Input'
import Button from '../UI/Button'

interface SiteResultItemProps {
  item: ILink,
  onUpdateSiteResult: (site: string, updatedLink: string) => void,
}

const SiteResultItem = ({ item, onUpdateSiteResult }: SiteResultItemProps) => {
  const [isEdit, setIsEdit] = useState(false)
  const [editedLink, setEditedLink] = useState(item.result?.link || '')

  const handleIsEdit = () => {
    setIsEdit(prev => !prev)
  }

  const onEditedLinkChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditedLink(e.target.value)
  }

  const onSaveEdit = () => {
    if (editedLink.length && editedLink !== item.result?.link) {
      onUpdateSiteResult(item.site, editedLink)
    }
    handleIsEdit()
  }

  const onCancelEdit = () => {
    setEditedLink(item.result?.link || '')
    handleIsEdit()
  }

  useEffect(() => {
    setEditedLink(item.result?.link || '')
  }, [item])

  return (
    <div key={item.site} className='flex items-center gap-x-2 xs:gap-x-4'>
      {isEdit ? (
        <div className='mt-1 flex-1 flex items-start gap-x-2'>
          <Input
            value={editedLink}
            onInputChange={onEditedLinkChange}
            autoFocus
            error={editedLink.length ? '' : 'Link is required'}
            placeholder='Enter link url'
            name='Link'
            isFieldDirty
            className='flex-1'
            py='py-2'
          />
          <div className='inline-flex'>
            <Button
              title='Save'
              onClick={onSaveEdit}
              p='py-1'
              disabled={!editedLink.length}
            />
          </div>
          <div className='inline-flex'>
            <Button
              title='Cancel'
              onClick={onCancelEdit}
              className='border-myred'
              p='py-1'
            />
          </div>
        </div>
      ) : (
        <>
          {item.result ? (
            <SuccessIcon className='w-5 h-5 min-w-[20px] xs:h-7 xs:w-7 xs:min-w-[28px] fill-green-500' />
          ) : (
            <RejectedIcon className='w-5 h-5 min-w-[20px] xs:h-7 xs:w-7 xs:min-w-[28px] fill-myred' />
          )}
          <div className='flex-1 flex flex-col max-w-full overflow-hidden'>
            <a
              className='truncate'
              href={'https://' + item.site}
              target='_blank'
              rel='noreferrer'
            >
              {item.site}
            </a>
            {!!item.result && (
              <a
                className='underline truncate text-xs xs:text-sm md:text-base'
                href={item.result.link}
                target='_blank'
                rel='noreferrer'
              >
                {item.result.title}
              </a>
            )}
          </div>
          <EditIcon
            className='w-5 h-5 min-w-[20px] xs:h-7 xs:w-7 xs:min-w-[28px] fill-white cursor-pointer'
            onClick={handleIsEdit}
          />
        </>
      )}
    </div>
  )
}

export default SiteResultItem