import initDomTree from '../../../src/client/initDomTree'
import insertImg from '../../../src/client/puzzle/insertImg'
import cache from '../../../src/client/cache'
import emitter from '../../../src/client/emitter'
import expect, {spyOn} from 'expect'

describe('event', () => {
  require('../../../src/client/event/validate')
  it('validate:success', done => {
    let div = document.createElement('div')
    initDomTree(div)
    insertImg(div, {
      bg: '',
      'puzzle-bg': '',
      puzzle: '',
      token: ''
    })
    spyOn(emitter, 'emit').andCallThrough()
    emitter.emit('validate:success')

    const {root, tip, puzzle, puzzleBg, bg, hint} = cache
    expect(root.classList.contains('ok')).toBeTruthy()
    expect(tip.classList.contains('ok')).toBeTruthy()

    expect(puzzle.style.opacity).toBe('0')
    expect(puzzleBg.style.opacity).toBe('0')
    expect(bg.style.opacity).toBe('1')
    expect(hint.style.opacity).toBe('0')
    expect(emitter.emit.calls[1].arguments).toInclude('disable')
    expect(emitter.emit.calls[2].arguments).toInclude('notify')

    setTimeout(() => {
      expect.restoreSpies()
      emitter.off('validate:success')
      done()
    }, 1501)
  })

  it('validate:failure', done => {
    let div = document.createElement('div')
    initDomTree(div)
    insertImg(div, {
      bg: '',
      'puzzle-bg': '',
      puzzle: '',
      token: ''
    })
    spyOn(emitter, 'emit').andCallThrough()
    emitter.emit('validate:failure')

    const {tip} = cache
    expect(tip.classList.contains('fail')).toBeTruthy()

    setTimeout(() => {
      expect(tip.classList.contains('fail')).toBeFalsy()

      expect(emitter.emit.calls[1].arguments).toInclude('notify')
      expect(emitter.emit.calls[2].arguments).toInclude('reset')
      expect.restoreSpies()
      emitter.off('validate:failure')
      done()
    }, 503)

  })

})
