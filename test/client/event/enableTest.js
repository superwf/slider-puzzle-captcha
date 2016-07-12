import '../../../src/client/event/enable'
import initDomTree from '../../../src/client/initDomTree'
import cache from '../../../src/client/cache'
import emitter from '../../../src/lib/emitter'
import expect, {spyOn} from 'expect'

describe('event', () => {
  it('enable', () => {
    let div = document.createElement('div')
    initDomTree(div)
    expect(cache.enable).toBe(false)
    spyOn(cache.tip.classList, 'remove')
    emitter.emit('enable')
    expect(cache.enable).toBe(true)
    expect(cache.tip.classList.remove).toHaveBeenCalled()
    expect(cache.tip.classList.remove.calls[0].arguments).toEqual(['disable'])
    expect.restoreSpies()
  })
})
