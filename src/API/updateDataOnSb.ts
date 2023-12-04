import supabase from "../supabaseClient"

export const updateDataOnSb = async (itemId: number, listsIds: number[]) => {
  try {
    const { data, error } = await supabase.from('Data')
      .update({ lists_ids: listsIds })
      .eq('id', itemId)

    if (error) {
      throw new Error(error.message)
    }
    console.log('update data', data)
  } catch (e) {
    console.error('Error update data', e)
  }
}