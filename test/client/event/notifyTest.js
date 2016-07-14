import '../../../src/client/event/notify'
import initDomTree from '../../../src/client/initDomTree'
import cache from '../../../src/client/cache'
import emitter from '../../../src/client/emitter'
import expect, {spyOn} from 'expect'

describe('event', () => {
  it('notify', () => {
    let div = document.createElement('div')
    initDomTree(div)
    const html = '<span class="abc">li</span>'
    emitter.emit('notify', html)

    expect(cache.notify.innerHTML).toEqual(html)
    expect(cache.notify.classList.contains('active')).toBeTruthy()

  })

  it('notify with autoHideTime', done => {
    // hide
    emitter.emit('notify', 'abc', 1)
    expect(cache.notify.classList.contains('active')).toBe(true)
    setTimeout(() => {
      expect(cache.notify.classList.contains('active')).toBe(false)
      expect.restoreSpies()
      done()
    }, 2)
  })
})
