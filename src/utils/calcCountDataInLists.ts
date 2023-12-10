import { IDataItemWithLinks } from "../types/data";
import { ICountDataInLists, IList } from "../types/lists";


export const calcCountDataInLists = (data: IDataItemWithLinks[], lists: IList[]) => {
  const map: ICountDataInLists = {}

  for (let list of lists) {
    map[list.id] = 0
  }

  for (let item of data) {
    for (let key in item.inLists) {
      const currCount = map[key]
      map[key] = currCount + 1
    }
  }

  // console.log('map', map)
  return map
}