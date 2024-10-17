import { IDataItemWithLinks, MediaTypeFilterOptions } from '../types/data'
import { ICountDataInLists, IList } from '../types/lists'

export const calcCountDataInLists = (
	data: IDataItemWithLinks[],
	lists: IList[],
	mediaFilterType: MediaTypeFilterOptions
) => {
	const map: ICountDataInLists = {}

	for (let list of lists) {
		map[list.id] = 0
	}

	for (let item of data) {
		for (let key in item.inLists) {
			if (
				mediaFilterType.title === 'All' ||
				mediaFilterType.type === item.mediaType
			) {
				map[key]++
			}
		}
	}
	return map
}
