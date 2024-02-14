import { IDataItemWithLinks } from "../types/data";

export const dataItemsToSbDataItems = (data: IDataItemWithLinks[], userId: string) => {
  return data.map(item => ({
    data_id: item.dataId,
    title: item.title,
    full_poster_url: item.fullPosterUrl,
    media_type: item.mediaType,
    release_date: item.releaseDate,
    vote: item.vote,
    id: item.id,
    inLists: item.inLists,
    links: item.links,
    notes: item.notes,
    user_id_owner: userId,
  }))
}