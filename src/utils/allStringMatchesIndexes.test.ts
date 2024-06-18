import { allStringMatchesIndexes } from "./allStringMatchesIndexes";

describe('allStringMatchesIndexes', () => {
  it('allStringMatchesIndexes empty search', () => {
    expect(allStringMatchesIndexes('', 'qwe')).toStrictEqual([])
  })
  it('allStringMatchesIndexes empty str', () => {
    expect(allStringMatchesIndexes('qwe', '')).toStrictEqual([])
  })
  it('allStringMatchesIndexes case 1', () => {
    expect(allStringMatchesIndexes('qwe', 'abcqwe qwe qwe')).toStrictEqual([3, 7, 11])
  })
  it('allStringMatchesIndexes case 2', () => {
    expect(allStringMatchesIndexes('a', 'abca/a')).toStrictEqual([0, 3, 5])
  })
  it('allStringMatchesIndexes case sensitive', () => {
    expect(allStringMatchesIndexes('a', 'AAA')).toStrictEqual([])
  })
})
