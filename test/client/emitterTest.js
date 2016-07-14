import emitter from '../../src/client/emitter'
import expect, {createSpy} from 'expect'

describe('test emitter', () => {

  afterEach(() => {
    expect.restoreSpies()
  })

  it('test trigger method', done => {
    let e = 'my-event'
    emitter.on(e, data => {
      expect(data).toBe(1234)
      done()
    })
    emitter.trigger(e, 1234)
    emitter.unbind(e)
  })

  it('test trigger method', done => {
    let e = 'my-event'
    emitter.bind(e, data => {
      expect(data).toBe(1234)
      done()
    })
    emitter.emit(e, 1234)
    emitter.off(e)
  })

  it('test unbind', () => {
    let spy = createSpy()
    expect(spy.calls.length).toBe(0)
    let e = 'my-event'
    emitter.on(e, spy)
    expect(spy.calls.length).toBe(0)
    emitter.emit(e, 1234)
    expect(spy.calls.length).toBe(1)

    emitter.emit(e, 1234)
    expect(spy.calls.length).toBe(2)

    emitter.off(e)
    emitter.emit(e, 1234)
    expect(spy.calls.length).toBe(2)
  })

})
