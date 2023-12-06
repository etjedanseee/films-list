import supabase from "../supabaseClient"
import { IInLists } from "../types/data"

export const updateDataOnSb = async (itemId: number, inLists: IInLists[], setLoading: (b: boolean) => void) => {
  setLoading(true)
  try {
    const { error } = await supabase.from('Data')
      .update({ inLists })
      .eq('id', itemId)

    if (error) {
      throw new Error(error.message)
    }
  } catch (e) {
    console.error('Error update data', e)
  } finally {
    setLoading(false)
  }
}