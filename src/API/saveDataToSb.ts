import supabase from "../supabaseClient"
import { IDataItemWithLinks } from "../types/data"

export const saveDataToSb = async (item: IDataItemWithLinks, userId: string, setLoading: (b: boolean) => void, setId: (id: number) => void) => {
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
    const { data, error } = await supabase.from('Data')
      .insert(sbItem)
      .select('*')
    if (error) {
      throw new Error(error.message)
    }
    if (data && data.length) {
      setId(data[0].id)
    }
  } catch (e) {
    console.error('Error insert data', e)
  } finally {
    setLoading(false)
  }
}