import React, { MouseEvent } from 'react'
import { IList } from '../types/lists'
import { ReactComponent as HeartIcon } from '../assets/DataListManagerIcons/heart.svg'
import { ReactComponent as PlayIcon } from '../assets/DataListManagerIcons/play.svg'
import { ReactComponent as SuccessIcon } from '../assets/DataListManagerIcons/success.svg'

interface DataListManagetItemProps {
  isHideListsTitles: boolean,
  isDataInList: boolean,
  list: IList,
  onListClick: (e: MouseEvent<HTMLDivElement>, listId: number) => void,
}

const DataListManagetItem = ({ isHideListsTitles, isDataInList, list, onListClick }: DataListManagetItemProps) => {
  return (
    <div
      className={`flex flex-col gap-y-1 justify-between items-center ${isHideListsTitles ? 'py-1' : 'py-2'}  
      border-r-[2px] border-zinc-900 ${isDataInList ? 'bg-myblue' : ''}
      px-1 hover:cursor-pointer ${list.name === 'Want to watch' && 'rounded-bl-md'}`
      }
      onClick={(e) => onListClick(e, list.id)}
      title={list.name}
    >
      {list.orderNum === 0 ?
        <HeartIcon className='h-7 w-7 fill-white' />
        : list.orderNum === 1 ?
          <PlayIcon className='h-8 w-8 -mt-[2px] ml-1 fill-white' />
          : list.orderNum === 2 ?
            <SuccessIcon className='h-7 w-7 fill-white' />
            : null
      }
      {!isHideListsTitles && <div>{list.name}</div>}
    </div>
  )
}

export default DataListManagetItem