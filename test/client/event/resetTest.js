import initDomTree from '../../../src/client/initDomTree'
import cache from '../../../src/client/cache'
import insertImg from '../../../src/client/puzzle/insertImg'
import emitter from '../../../src/client/emitter'
import expect, {spyOn} from 'expect'

describe('event', function() {
  this.timeout(5000)
  it('reset', done => {
    let div = document.createElement('div')
    initDomTree(div)
    insertImg(div, {
      bg: '',
      'puzzle-bg': '',
      puzzle: '',
      token: ''
    })
    document.body.appendChild(div)

    const {slider, puzzle, root, tip} = cache
    // fake move some distance
    slider.parentNode.style.position = 'absolute'
    puzzle.parentNode.style.position = 'absolute'
    slider.style.position = 'absolute'
    puzzle.style.position = 'absolute'
    slider.style.left = '20px'
    puzzle.style.left = '20px'

    require('../../../src/client/event/reset')
    spyOn(emitter, 'emit').andCallThrough()
    emitter.emit('reset')

    puzzle.classList.add('animated')
    puzzle.classList.add('flash')
    root.classList.add('ok')
    tip.classList.add('ok')

    // reset中500之后执行，设置600足够
    setTimeout(() => {
      expect(slider.style.left).toBe('0px')
      expect(puzzle.style.left).toBe('0px')
      expect(puzzle.classList.contains('animated')).toBeFalsy()
      expect(puzzle.classList.contains('flash')).toBeFalsy()

      expect(root.classList.contains('ok')).toBeFalsy()
      expect(tip.classList.contains('ok')).toBeFalsy()

      expect(emitter.emit.calls[1].arguments).toInclude('disable')
      expect(emitter.emit.calls[2].arguments).toInclude('enable')
      // console.log(emitter.emit.calls.length)

      document.body.removeChild(div)
      emitter.off('reset')
      expect.restoreSpies()
      done()
    }, 600)

  })
})
