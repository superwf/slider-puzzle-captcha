import '../../../src/client/event/refresh'
import initDomTree from '../../../src/client/initDomTree'
import cache from '../../../src/client/cache'
import fetchImg from '../../../src/client/puzzle/fetchImg'
import emitter from '../../../src/lib/emitter'
import expect from 'expect'

import fakeFetch from '../fakeFetch'
import config from '../../../src/config'

describe('event', () => {

  beforeEach(() => {
    fakeFetch.create()

    fakeFetch.response({
      ok: true,
      bg: '',
      puzzle: '',
      token: 'token111',
      'puzzle-bg': '',
    }, config.api.captcha)
  })

  afterEach(() => {
    fakeFetch.destroy()
  })

  it('refresh', done => {
    // emitter.off('reset')
    let div = document.createElement('div')
    initDomTree(div)

    emitter.emit('refresh')
    emitter.on('reset', function reset() {
      const {bg, puzzle, puzzleBg, hint} = cache
      expect(bg.style.opacity).toBe('1')
      expect(puzzle.style.opacity).toBe('0')
      expect(puzzleBg.style.opacity).toBe('0')
      expect(hint.style.opacity).toBe('1')
      expect(cache.enable).toBeTruthy()
      expect(cache.token).toBe('token111')
      emitter.off('reset', reset)
      done()
    })
  })
})
