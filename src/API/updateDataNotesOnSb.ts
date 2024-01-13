import supabase from "../supabaseClient"

export const updateDataNotesOnSb = async (itemId: number, notes: string, setLoading: (b: boolean) => void) => {
  setLoading(true)
  try {
    const { error } = await supabase.from('Data')
      .update({ notes })
      .eq('id', itemId)

    if (error) {
      throw new Error(error.message)
    }
  } catch (e) {
    console.error('Error update data notes', e)
  } finally {
    setLoading(false)
  }
}
