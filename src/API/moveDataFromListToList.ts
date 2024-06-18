import { dataItemsToSbDataItems } from './../utils/dataItemsToSbDataItems';
import { toast } from "react-toastify";
import supabase from "../supabaseClient";
import { IDataItemWithLinks } from "../types/data";

interface IMoveDataFromListToListProps {
  fromListId: number,
  toListId: number,
  method: 'move' | 'copy',
  setLoading: (b: boolean) => void,
  data: IDataItemWithLinks[],
  userId: string,
}

export const moveDataFromListToList = async ({ fromListId, toListId, method, setLoading, data, userId }: IMoveDataFromListToListProps) => {
  setLoading(true)
  const filteredData: IDataItemWithLinks[] = data.filter(item => item.inLists[fromListId])
  const itemsToUpdate: IDataItemWithLinks[] = []
  for (const item of filteredData) {
    const inListsEntries = Object.entries(item.inLists)
    const toListEntr = inListsEntries.find(entr => +entr[0] === toListId)
    let fromListDate = new Date().toISOString()
    const updatedEntries = inListsEntries.filter(entr => {
      if (+entr[0] === fromListId) {
        fromListDate = entr[1]  // prev date
        return method === 'move' ? false : true
      }
      return true
    })
    if (!toListEntr) {
      updatedEntries.push([toListId.toString(), fromListDate])
      if (method === 'copy') {
        itemsToUpdate.push({
          ...item,
          inLists: Object.fromEntries(updatedEntries),
        })
      }
    }
    if (method === 'move') {
      itemsToUpdate.push({
        ...item,
        inLists: Object.fromEntries(updatedEntries),
      })
    }
  }
  if (itemsToUpdate.length) {
    try {
      const { error } = await supabase.from('Data')
        .upsert(dataItemsToSbDataItems(itemsToUpdate, userId))
      if (error) {
        throw new Error(error.message)
      }
      toast.success(`Successful ${method} data`)
    } catch (e) {
      console.error(`Error ${method} data`, e)
    }
  }
  setLoading(false)
}