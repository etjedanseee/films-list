import { calcEstimatedSeriesTime } from "./calcEstimatedSeriesTime"

describe('calcEstimatedSeriesTime', () => {
  it('calcEstimatedSeriesTime episodeRuntime === 0', () => {
    expect(calcEstimatedSeriesTime(10, [])).toBe(0)
  })
  it('calcEstimatedSeriesTime episodesCount === 0', () => {
    expect(calcEstimatedSeriesTime(0, [])).toBe(0)
  })
  it('calcEstimatedSeriesTime case 1', () => {
    expect(calcEstimatedSeriesTime(2, [10, 20])).toBe(30)
  })
  it('calcEstimatedSeriesTime case 2', () => {
    expect(calcEstimatedSeriesTime(10, [10, 20])).toBe(150)
  })
})