import { calcStringsSimilarity, howSimilarStrings } from "./howSimilarStrings"

describe('howSimilarStrings', () => {
  it('empty search', () => {
    expect(howSimilarStrings('', 'qwe')).toBe(0)
  })
  it('empty str', () => {
    expect(howSimilarStrings('qwe', '')).toBe(0)
  })
  it('empty search, str', () => {
    expect(howSimilarStrings('', '')).toBe(0)
  })
  it('case sensitive 1', () => {
    expect(howSimilarStrings('the boys', 'Watch The Boys')).toBe(0)
  })
  it('case sensitive 2', () => {
    expect(howSimilarStrings('The Boys', 'watch the boys')).toBe(0)
  })
  it('search less than 2 words', () => {
    expect(howSimilarStrings('Boys', 'Boys')).toBe(1)
  })
  it('search less than 2 words and different', () => {
    expect(howSimilarStrings('Car', 'Boys')).toBe(0)
  })
  it('case 1', () => {
    expect(howSimilarStrings('The Boys', 'Watch The Boys')).toBe(1)
  })
  it('case 2', () => {
    expect(howSimilarStrings('Монахиня 2', 'Фільм "Монахиня 2" (2023) дивитись онлайн')).toBe(1)
  })
  it('case 3', () => {
    expect(howSimilarStrings('Проклятие монахини 2', 'Смотреть все части фильма "Проклятие монахини". Проклятие монахини 2')).toBe(1)
  })
  it('case 4', () => {
    expect(howSimilarStrings('the nun ii', 'aquaman and the lost kingdom 2023 124m the nun ii 2023 110m')).toBe(1)
  })
  it('case 5', () => {
    expect(howSimilarStrings('Проклятие монахини 2', 'Смотреть фильм "Проклятие монахини" 2')).toBeCloseTo(0.95)
  })
  it('case 6', () => {
    expect(howSimilarStrings('монахиня 2', 'фільм монахиня 2 2023 дивитись онлайн')).toBe(1)
  })
  it('more than 1 similarities >= minSimilarity', () => {
    expect(howSimilarStrings('firstWord secondWord', 'firstWord Q secondWord, firstWord QsecondWord')).toBeCloseTo(0.95)
  })
})

describe('calcStringsSimilarity', () => {
  it('empty search', () => {
    expect(calcStringsSimilarity('', 'qwe')).toBe(0)
  })
  it('empty str', () => {
    expect(calcStringsSimilarity('qwe', '')).toBe(0)
  })
  it('empty search, str', () => {
    expect(calcStringsSimilarity('', '')).toBe(0)
  })
  it('case sensitive 1', () => {
    expect(calcStringsSimilarity('the boys', 'The Boys')).toBeCloseTo(0.75)
  })
  it('case sensitive 2', () => {
    expect(calcStringsSimilarity('The Boys', 'the boys')).toBeCloseTo(0.75)
  })
  it('case sensitive 3', () => {
    expect(calcStringsSimilarity('a', 'A')).toBe(0)
  })
  it('case 1', () => {
    expect(calcStringsSimilarity('the nun 2', 'the nun 2')).toBe(1)
  })
  it('case 2', () => {
    expect(calcStringsSimilarity('aa', 'ab')).toBeCloseTo(0.5)
  })
  it('case 3', () => {
    expect(calcStringsSimilarity('the nun 2', 'the nun ii 2')).toBeCloseTo(0.75)
  })
  it('case 4', () => {
    expect(calcStringsSimilarity('the nun 2', 'the wilderness 2')).toBeCloseTo(0.44)
  })
  it('case 5', () => {
    expect(calcStringsSimilarity('the nun 2', 'the nun II')).toBeCloseTo(0.8)
  })
})