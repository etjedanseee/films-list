import supabase from "../supabaseClient";
import { IDataItemWithLinks } from "../types/data";

export const deleteList = async (listId: number, setLoading: (b: boolean) => void) => {
  try {
    setLoading(true)
    const { data, error } = await supabase.from('Data').select('*')
    if (error) {
      throw new Error(error.message)
    }
    const filteredData: IDataItemWithLinks[] = data.filter(item => item.inLists[listId])
    const itemsToUpdate: IDataItemWithLinks[] = []
    const itemsToDelete: number[] = []

    for (const item of filteredData) {
      const inListsEntries = Object.entries(item.inLists)
      if (inListsEntries.length > 1) {
        itemsToUpdate.push({
          ...item,
          inLists: Object.fromEntries(inListsEntries.filter(item => +item[0] !== listId)),
        })
      } else {
        itemsToDelete.push(item.id);
      }
    }

    if (itemsToUpdate.length) {
      try {
        const { error } = await supabase.from('Data')
          .upsert(itemsToUpdate)
        if (error) {
          throw new Error(error.message)
        }
      } catch (e) {
        console.error('Error updating rows after delete list', e)
      }
    }

    if (itemsToDelete.length) {
      try {
        const { error } = await supabase.from('Data')
          .delete()
          .in('id', itemsToDelete);
        if (error) {
          throw new Error(error.message)
        }
      } catch (e) {
        console.error('Error delete rows after delete list', e)
      }
    }
    try {
      const { error } = await supabase.from('Lists')
        .delete()
        .eq('id', listId)
      if (error) {
        throw new Error(error.message)
      }
    } catch (e) {
      console.error('Error delete list', e)
    }
  } catch (e) {
    console.error('Error delete list func:', e);
  } finally {
    setLoading(false)
  }
}