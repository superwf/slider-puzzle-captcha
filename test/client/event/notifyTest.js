import '../../../src/client/event/notify'
import initDomTree from '../../../src/client/initDomTree'
import cache from '../../../src/client/cache'
import emitter from '../../../src/lib/emitter'
import expect, {spyOn} from 'expect'

describe('event', () => {
  it('notify and notify:hide', () => {
    let div = document.createElement('div')
    initDomTree(div)
    spyOn(emitter, 'emit').andCallThrough()

    const html = '<span class="abc">li</span>'
    emitter.emit('notify', html)

    expect(cache.notify.innerHTML).toEqual(html)
    expect(cache.notify.classList.contains('active')).toBeTruthy()

    // hide
    emitter.emit('notify:hide')
    expect(cache.notify.classList.contains('active')).toBeFalsy()

    expect.restoreSpies()
  })
})
