import supabase from "../supabaseClient"
import { IDataItemWithLinks } from "../types/data"

export const saveDataToSb = async (item: IDataItemWithLinks, userId: string, setLoading: (b: boolean) => void) => {
  setLoading(true)
  const sbItem = {
    data_id: item.dataId,
    title: item.title,
    full_poster_url: item.fullPosterUrl,
    media_type: item.mediaType,
    release_date: item.releaseDate,
    vote: item.vote,
    inLists: item.inLists,
    links: item.links,
    user_id_owner: userId,
  }
  try {
    const { error } = await supabase.from('Data').insert(sbItem)
    if (error) {
      throw new Error(error.message)
    }
  } catch (e) {
    console.error('Error insert data', e)
  } finally {
    setLoading(false)
  }
}