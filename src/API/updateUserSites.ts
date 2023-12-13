import supabase from "../supabaseClient"

export const updateUserSites = async (userId: string, updatedSites: string[], setLoading: (b: boolean) => void) => {
  setLoading(true)
  try {
    const { error } = await supabase
      .from('UserSearchSites')
      .update({ sites: updatedSites })
      .eq('user_id_owner', userId)

    if (error) {
      throw new Error(error.message)
    }
  } catch (e) {
    console.error('Error update sites', e)
  } finally {
    setLoading(false)
  }
}