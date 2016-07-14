import '../../../src/client/event/error'
import initDomTree from '../../../src/client/initDomTree'
import cache from '../../../src/client/cache'
import emitter from '../../../src/client/emitter'
import expect, {spyOn} from 'expect'

describe('event', () => {
  it('error', () => {
    let div = document.createElement('div')
    initDomTree(div)
    cache.set({enable: true})
    expect(cache.enable).toBe(true)
    // spyOn(cache.tip.classList, 'remove')
    spyOn(emitter, 'emit').andCallThrough()
    emitter.emit('server:error')
    expect(cache.enable).toBe(false)
    expect(cache.tip.classList.contains('broken')).toBeTruthy()
    expect(cache.tip.classList.contains('tip')).toBeTruthy()
    expect(cache.tip.classList.contains('disable')).toBeFalsy()
    expect(cache.tip.classList.contains('fail')).toBeFalsy()

    expect(emitter.emit.calls[1].arguments).toInclude('notify')
    emitter.off('server:error')
    expect.restoreSpies()
  })
})
