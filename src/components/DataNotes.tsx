import React, { ChangeEvent, useState } from 'react'
import Textarea from '../UI/Textarea'
import Button from '../UI/Button'
import Loader from '../UI/Loader'
import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/useTypedSelector'

interface DataNotesProps {
  id: number | null,
  dataNotes: string,
  setDataNotes: (notes: string) => void,
}

const DataNotes = ({ id, dataNotes, setDataNotes }: DataNotesProps) => {
  const [notes, setNotes] = useState(dataNotes)
  const [isButtonsVisible, setIsButtonsVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const { data } = useTypedSelector(state => state.data)
  const { updateDataNotesOnSb } = useActions()

  const onNotesChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setNotes(value)
    setIsButtonsVisible(dataNotes !== value)
  }

  const onSaveNotes = () => {
    if (notes.length < 5000 && id) {
      setDataNotes(notes)
      updateDataNotesOnSb(id, notes, setLoading, data)
      setIsButtonsVisible(false)
    }
  }

  const onCancel = () => {
    setNotes(dataNotes)
    setIsButtonsVisible(false)
  }

  if (loading) {
    return (
      <div className='flex justify-center'>
        <Loader size='40' />
      </div>
    )
  }

  return (
    <div>
      <div className='font-bold mb-1 text-lg'>Notes:</div>
      <Textarea
        value={notes}
        onChange={onNotesChange}
        placeholder='Write some notes'
      />
      {isButtonsVisible && (
        <div className='flex gap-x-3 items-center max-w-xs'>
          <Button
            onClick={onSaveNotes}
            title='Save'
            p='py-1'
          />
          <Button
            onClick={onCancel}
            title='Cancel'
            className='border-myred'
            p='py-1'
          />
        </div>
      )}
    </div>
  )
}

export default DataNotes