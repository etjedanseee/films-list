export const calcEstimatedSeriesTime = (episodesCount: number, episodeRuntime: number[]): number => {
  if (!episodesCount || !episodeRuntime.length) return 0
  const episodesRuntime = episodeRuntime.reduce((prev, curr) => prev += curr)
  const averageEpisodeRuntime = Math.ceil(episodesRuntime / episodeRuntime.length)
  return episodesCount * averageEpisodeRuntime
}