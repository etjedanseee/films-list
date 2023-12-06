import supabase from "../supabaseClient"

export const deleteDataOnSb = async (itemId: number, setLoading: (b: boolean) => void) => {
  setLoading(true)
  try {
    const { error } = await supabase.from('Data')
      .delete()
      .eq('id', itemId)

    if (error) {
      throw new Error(error.message)
    }
  } catch (e) {
    console.error('Error delete data', e)
  } finally {
    setLoading(false)
  }
}