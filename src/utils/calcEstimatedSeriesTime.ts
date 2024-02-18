export const calcEstimatedSeriesTime = (episodesCount: number, episodeRuntime: number[]): number => {
  const averageEpisodeRuntime = Math.ceil(episodeRuntime.reduce((prev, curr) => prev += curr) / episodeRuntime.length)
  return episodesCount * averageEpisodeRuntime
}