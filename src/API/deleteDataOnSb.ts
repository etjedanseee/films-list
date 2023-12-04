import supabase from "../supabaseClient"

export const deleteDataOnSb = async (itemId: number) => {
  try {
    const { data, error } = await supabase.from('Data')
      .delete()
      .eq('id', itemId)

    if (error) {
      throw new Error(error.message)
    }
    console.log('delete data', data)
  } catch (e) {
    console.error('Error delete data', e)
  }
}