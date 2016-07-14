import '../../../src/client/event/disable'
import initDomTree from '../../../src/client/initDomTree'
import cache from '../../../src/client/cache'
import emitter from '../../../src/client/emitter'
import expect, {spyOn} from 'expect'

describe('event', () => {
  it('disable', () => {
    let div = document.createElement('div')
    initDomTree(div)
    expect(cache.enable).toBe(false)
    spyOn(cache.tip.classList, 'add')
    emitter.emit('disable')
    expect(cache.enable).toBe(false)
    expect(cache.tip.classList.add).toHaveBeenCalled()
    expect(cache.tip.classList.add.calls[0].arguments).toEqual(['disable'])
    expect.restoreSpies()
  })
})
