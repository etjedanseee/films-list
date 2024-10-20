import React, { MouseEvent } from 'react'
import { IList } from '../types/lists'
import { ReactComponent as HeartIcon } from '../assets/DataListManagerIcons/heart.svg'
import { ReactComponent as PlayIcon } from '../assets/DataListManagerIcons/play.svg'
import { ReactComponent as SuccessIcon } from '../assets/DataListManagerIcons/success.svg'

interface DataListManagetItemProps {
	isHideListsTitles: boolean
	isDataInList: boolean
	list: IList
	dateAddedToList: string
	onListClick: (e: MouseEvent<HTMLDivElement>, listId: number) => void
}

const DataListManagetItem = ({
	isHideListsTitles,
	isDataInList,
	list,
	dateAddedToList,
	onListClick,
}: DataListManagetItemProps) => {
	const title = isDataInList
		? `${list.name} (Added ${dateAddedToList.slice(0, 16)})`
		: list.name
	return (
		<div
			className={`flex flex-col gap-y-1 justify-between items-center px-1 hover:cursor-pointer border-r-[2px] border-zinc-900
        ${isHideListsTitles ? 'py-1' : 'py-2'}
        ${isDataInList ? 'bg-myblue' : ''}
        ${list.name === 'Want to watch' && 'rounded-bl-md'}
      `}
			onClick={(e) => onListClick(e, list.id)}
			title={title}
		>
			{list.orderNum === 0 ? (
				<HeartIcon className='h-7 w-7 fill-white' />
			) : list.orderNum === 1 ? (
				<PlayIcon className='h-8 w-8 -mt-[2px] ml-1 fill-white' />
			) : list.orderNum === 2 ? (
				<SuccessIcon className='h-7 w-7 fill-white' />
			) : null}
			{!isHideListsTitles && <div>{list.name}</div>}
		</div>
	)
}

export default DataListManagetItem
