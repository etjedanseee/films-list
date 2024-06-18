import { isIncludesEntirely } from "./isIncludesEntirely"

describe('isIncludesEntirely', () => {
  it('empty search', () => {
    expect(isIncludesEntirely('', 'qwe')).toBe(false)
  })
  it('empty str', () => {
    expect(isIncludesEntirely('qwe', '')).toBe(false)
  })
  it('empty search and str', () => {
    expect(isIncludesEntirely('', '')).toBe(false)
  })
  it('case 1', () => {
    expect(isIncludesEntirely('word', 'some text with one word')).toBe(true)
  })
  it('case 2', () => {
    expect(isIncludesEntirely('word', 'some text with words')).toBe(false)
  })
  it('case 3', () => {
    expect(isIncludesEntirely('some words', 'some text with some words')).toBe(true)
  })
  it('case 4', () => {
    expect(isIncludesEntirely('some words', 'some text with some wordsQQQ')).toBe(false)
  })
})