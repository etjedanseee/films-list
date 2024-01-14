import React, { useEffect } from 'react'
import Button from './Button'

interface ConfirmationProps {
  title: string,
  onClose: () => void,
  onConfirm: () => void,
}

const Confirmation = ({ title, onClose, onConfirm }: ConfirmationProps) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  return (
    <div
      className='z-50 fixed top-0 left-0 h-full w-full bg-black bg-opacity-70 flex justify-center items-center'
      onClick={onClose}
    >
      <div
        className={`max-w-none xs:max-w-md flex flex-col gap-y-2 justify-center border-2 border-myblue rounded-xl 
          py-4 xs:py-6 px-6 xs:px-8 bg-bg1
        `}
        onClick={e => e.stopPropagation()}
      >
        <div className='text-xl font-medium mb-3'>{title}</div>
        <Button
          onClick={onConfirm}
          title='Confirm'
          className='bg-myred border-myred'
        />
        <Button
          onClick={onClose}
          title='Cancel'
        />
      </div>
    </div>
  )
}

export default Confirmation