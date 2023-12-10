import supabase from "../supabaseClient";
import { IDataItemWithLinks } from "../types/data";

export const deleteList = async (listId: number) => {
  try {
    const { data, error } = await supabase.from('Data').select('*')
    if (error) {
      throw new Error(error.message)
    }
    const filteredData: IDataItemWithLinks[] = data.filter(item => item.inLists[listId])
    const rowsToUpdate: IDataItemWithLinks[] = []
    const rowsToDelete: number[] = []

    for (const row of filteredData) {
      const inListsEntries = Object.entries(row.inLists)
      if (inListsEntries.length > 1) {
        rowsToUpdate.push({
          ...row,
          inLists: Object.fromEntries(inListsEntries.filter(item => +item[0] !== listId)),
        })
      } else {
        rowsToDelete.push(row.id);
      }
    }

    if (rowsToUpdate.length) {
      try {
        const { error } = await supabase.from('Data')
          .upsert([...rowsToUpdate])
        if (error) {
          throw new Error(error.message)
        }
      } catch (e) {
        console.error('Error updating rows after delete list', e)
      }
    }

    if (rowsToDelete.length) {
      try {
        const { error } = await supabase.from('Data')
          .delete()
          .in('id', rowsToDelete);
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
  }
}