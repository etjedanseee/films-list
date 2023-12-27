import supabase from "../supabaseClient"
import { ILink } from "../types/search"

export const updateDataLinksOnSb = async (itemId: number, links: ILink[], setLoading: (b: boolean) => void) => {
  setLoading(true)
  try {
    const { error } = await supabase.from('Data')
      .update({ links })
      .eq('id', itemId)

    if (error) {
      throw new Error(error.message)
    }
  } catch (e) {
    console.error('Error update data links', e)
  } finally {
    setLoading(false)
  }
}