import supabase from "../supabaseClient"


export const createList = async (name: string, orderNum: number, userId: string) => {
  const list = {
    user_id_owner: userId,
    name,
    order_num: orderNum,
  }
  try {
    const { error } = await supabase.from('Lists').insert(list)
    if (error) {
      throw new Error(error.message)
    }
  } catch (e) {
    console.error('Error insert new list', e)
  }
}