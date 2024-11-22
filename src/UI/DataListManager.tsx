import React, { useState, useEffect, MouseEvent } from 'react'
import { ReactComponent as BookmarkIcon } from '../assets/DataListManagerIcons/bookmark.svg'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { IDataItemWithLinks, IInLists } from '../types/data'
import { ILink, IPreviewDataItem } from '../types/search'
import SavedListsModal from './SavedListsModal'
import DataListManagetItem from './DataListManagetItem'
import Loader from './Loader'
import { useActions } from '../hooks/useActions'
import Confirmation from './Confirmation'

interface DataListManagerProps {
	previewDataItem: IPreviewDataItem
	id: number | null
	setId: (id: number | null) => void
	sitesResults: ILink[]
	isHideListsTitles?: boolean
	inLists: IInLists
	setInLists: (newInLists: IInLists) => void
	notes: string
}

const DataListManager = ({
	id,
	setId,
	inLists,
	setInLists,
	previewDataItem,
	notes,
	sitesResults,
	isHideListsTitles = false,
}: DataListManagerProps) => {
	const { lists } = useTypedSelector((state) => state.lists)
	const { data } = useTypedSelector((state) => state.data)
	const { user } = useTypedSelector((state) => state.auth)
	const { saveDataToSb, updateDataInListsOnSb, deleteDataOnSb } = useActions()
	const [loading, setLoading] = useState(false)
	const [isSaveToListsModalVisible, setIsSaveToListsModalVisible] =
		useState(false)
	const [isConfirmDeleteVisible, setIsConfirmDeleteVisible] = useState(false)
	const isDataInSavedList = Object.keys(inLists).find((key) =>
		lists.slice(3).find((a) => a.id === +key)
	)

	const onListClick = (e: MouseEvent, listId: number) => {
		e.stopPropagation()
		if (!user) {
			return
		}
		const listsEntries = Object.entries(inLists)
		const currentList = { [listId]: new Date().toISOString() }
		if (!listsEntries.length) {
			const stubId = 999999
			const itemWithLinks: IDataItemWithLinks = {
				...previewDataItem,
				links: sitesResults,
				inLists: currentList,
				id: stubId,
				notes,
			}
			setInLists(currentList)
			saveDataToSb(itemWithLinks, user.id, setLoading, setId, data)
		} else if (id != null) {
			if (inLists[listId]) {
				const filteredEntries = listsEntries.filter(
					(entr) => +entr[0] !== listId
				)
				const filteredLists = Object.fromEntries(filteredEntries)
				if (filteredEntries.length) {
					setInLists(filteredLists)
					updateDataInListsOnSb(id, filteredLists, setLoading, data)
				} else {
					setIsConfirmDeleteVisible(true)
				}
			} else {
				const updatedInLists = { ...inLists, ...currentList }
				setInLists(updatedInLists)
				updateDataInListsOnSb(id, updatedInLists, setLoading, data)
			}
		}
	}

	const handleSaveToListsModalVisible = (e: MouseEvent<HTMLDivElement>) => {
		e.stopPropagation()
		setIsSaveToListsModalVisible((prev) => !prev)
	}

	const onSaveClick = (e: MouseEvent<HTMLDivElement>) => {
		e.stopPropagation()
		handleSaveToListsModalVisible(e)
	}

	const isDataInList = (listId: number) => {
		return !!inLists[listId]
	}

	const onDeleteData = () => {
		if (!id) {
			return
		}
		const currId = id
		setInLists({})
		setId(null)
		deleteDataOnSb(currId, setLoading, data)
		onCloseConfirmDeleteData()
	}

	const onCloseConfirmDeleteData = () => {
		setIsConfirmDeleteVisible(false)
	}

	useEffect(() => {
		const currData = data.find(
			(item) =>
				item.dataId === previewDataItem.dataId &&
				item.mediaType === previewDataItem.mediaType
		)
		if (currData) {
			setInLists(currData.inLists)
			setId(currData.id)
		}
	}, [previewDataItem, data, setId, setInLists])

	return (
		<>
			{!lists.length || loading ? (
				<>
					{isHideListsTitles ? (
						<div className='py-[6px] bg-mygray3 flex justify-center items-center'>
							<Loader size='28' />
						</div>
					) : (
						<div className='py-2 bg-mygray3 flex justify-center items-center'>
							<Loader size='48' />
						</div>
					)}
				</>
			) : (
				<div className='grid grid-cols-4 text-small tracking-tighter rounded-b-md bg-mygray3 select-none'>
					{new Array(3).fill(0).map((_, index) => (
						<DataListManagetItem
							isDataInList={isDataInList(lists[index].id)}
							isHideListsTitles={isHideListsTitles}
							list={lists[index]}
							onListClick={onListClick}
							dateAddedToList={inLists[lists[index].id]}
							key={index}
						/>
					))}
					<div
						className={`flex flex-col gap-y-1 justify-between items-center 
              px-1 hover:cursor-pointer rounded-br-md 
              ${isHideListsTitles ? 'py-1' : 'py-2'} 
              ${isDataInSavedList ? 'bg-yellow-500 text-black' : ''}
            `}
						onClick={onSaveClick}
						title={isDataInSavedList ? 'Saved' : 'Save'}
					>
						<BookmarkIcon
							className={`h-7 w-7 ${
								isDataInSavedList ? 'fill-mygray' : 'fill-white'
							}`}
						/>
						{!isHideListsTitles && (
							<div
								className={`${
									isDataInSavedList ? 'text-black font-medium' : 'text-white'
								} font-medium`}
							>
								Save
							</div>
						)}
					</div>
				</div>
			)}
			{isSaveToListsModalVisible && (
				<SavedListsModal
					handleClose={(e) => handleSaveToListsModalVisible(e)}
					additionalLists={lists.slice(3)}
					onListClick={onListClick}
					dataInLists={inLists}
				/>
			)}
			{isConfirmDeleteVisible && (
				<Confirmation
					title='Confirm delete data'
					onConfirm={onDeleteData}
					onClose={onCloseConfirmDeleteData}
				/>
			)}
		</>
	)
}

export default DataListManager
