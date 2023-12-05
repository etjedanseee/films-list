import { IDataItemWithLinks } from "../types/data";
import { ICountDataInLists, IList } from "../types/lists";


export const calcCountDataInLists = (data: IDataItemWithLinks[], lists: IList[]) => {
  const map: ICountDataInLists = {}

  for (let list of lists) {
    map[list.id] = 0
  }

  for (let item of data) {
    const itemLists = item.listsIds
    for (let itemListId of itemLists) {
      const currCount = map[itemListId]
      map[itemListId] = currCount + 1
    }
  }

  // console.log('map', map)
  return map
}