import React from 'react'
import { ReactComponent as BookmarkIcon } from '../assets/DataListManagerIcons/bookmark.svg'
import { ReactComponent as HeartIcon } from '../assets/DataListManagerIcons/heart.svg'
import { ReactComponent as PlayIcon } from '../assets/DataListManagerIcons/play.svg'
import { ReactComponent as SuccessIcon } from '../assets/DataListManagerIcons/success.svg'
import { useTypedSelector } from '../hooks/useTypedSelector'

const DataListManager = () => {
  const { lists } = useTypedSelector(state => state.lists)

  // console.log('lists', lists)
  const onListClick = (listId: number) => {

  }

  if (!lists.length) {
    return <div>Loading...</div>
  }

  return (
    <div className='grid grid-cols-4 text-small tracking-tighter rounded-b-md bg-gray3'>
      <div
        className={`flex flex-col gap-y-1 justify-between items-center py-2 border-r-[2px] border-zinc-900 
          px-1 hover:cursor-pointer`
        }
        onClick={() => onListClick(lists[0].id)}
      >
        <HeartIcon className='h-7 w-7 fill-white' />
        <div>{lists[0].name}</div>
      </div>
      <div
        className={`flex flex-col gap-y-1 justify-between items-center py-2 border-r-[2px] border-zinc-900 
          px-1 hover:cursor-pointer`
        }
        onClick={() => onListClick(lists[1].id)}
      >
        <PlayIcon className='h-8 w-8 fill-white -mt-[2px] ml-1' />
        <div>{lists[1].name}</div>
      </div>
      <div
        className={`flex flex-col gap-y-1 justify-between items-center py-2 border-r-[2px] border-zinc-900 
          px-1 hover:cursor-pointer`
        }
        onClick={() => onListClick(lists[2].id)}
      >
        <SuccessIcon className='h-7 w-7 fill-white' />
        <div>{lists[2].name}</div>
      </div>
      <div
        className={`flex flex-col gap-y-1 justify-between items-center py-2 
          px-1 hover:cursor-pointer`
        }
      // onClick={() => onListClick()}
      >
        <BookmarkIcon className='h-7 w-7 fill-white' />
        <div>Save</div>
      </div>
    </div>
  )
}

export default DataListManager