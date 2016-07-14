import insertImg from '../../../src/client/puzzle/insertImg'
import expect from 'expect'
import cache from '../../../src/client/cache'

describe('insertImg', () => {
  it('insert', () => {
    cache.clear()
    expect(cache.enable).toBe(false)
    const div = document.createElement('div')
    expect('token' in cache).toBe(false)
    insertImg(div, {
      bg: '',
      puzzle: '',
      'puzzle-bg': '',
      token: 'abc',
    })
    expect(div.querySelector('img.bg')).toBe(cache.bg)
    expect(div.querySelector('img.puzzle')).toBe(cache.puzzle)
    expect(div.querySelector('img.puzzle-bg')).toBe(cache.puzzleBg)
    expect('token' in cache).toBe(true)
    expect(cache.enable).toBe(true)
  })
})
