import '../../../src/client/event/expired'
import initDomTree from '../../../src/client/initDomTree'
import emitter from '../../../src/client/emitter'
import expect, {spyOn} from 'expect'

describe('event', () => {
  it('expired', () => {
    let div = document.createElement('div')
    initDomTree(div)
    spyOn(emitter, 'emit').andCallThrough()
    emitter.emit('token:expired')

    expect(emitter.emit.calls.length).toBe(4)
    expect(emitter.emit.calls[1].arguments).toInclude('disable')
    expect(emitter.emit.calls[2].arguments).toInclude('notify')
    expect(emitter.emit.calls[3].arguments).toInclude('refresh')

    expect.restoreSpies()
    emitter.off('token:expired')
  })
})
