import supabase from "../supabaseClient"

export const updateListName = async (listId: number, editedName: string, setLoading: (b: boolean) => void) => {
  try {
    setLoading(true)
    const { error } = await supabase.from('Lists')
      .update({ name: editedName })
      .eq('id', listId)
    if (error) {
      throw new Error(error.message)
    }
  } catch (e) {
    console.error('Error update list', listId, e)
  } finally {
    setLoading(false)
  }
}