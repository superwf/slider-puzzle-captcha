import validate from '../../../src/client/slider/validate'
import expect, {spyOn} from 'expect'
import config from '../../../src/config'
import emitter from '../../../src/client/emitter'

import fakeFetch from '../fakeFetch'

describe('slider', () => {

  beforeEach(() => {
    fakeFetch.create()
  })

  afterEach(() => {
    fakeFetch.destroy()
  })

  it('validate ok true', done => {
    fakeFetch.response({
      ok: true,
    }, config.api.validate)
    validate({token: 'abc', x: '123'}).then(data => {
      expect(data.ok).toBe(true)
      done()
    })
  })


  it('validate expired true', done => {
    fakeFetch.response({
      ok: true,
      expired: true,
    }, config.api.validate)
    spyOn(emitter, 'emit')
    validate({token: 'abc', x: '123'}).then(data => {
      expect(data.expired).toBe(true)
      expect(emitter.emit.calls[0].arguments).toInclude('token:expired')
      expect.restoreSpies()
      done()
    })
  })

  it('validate ok false', done => {
    let res = new window.Response('', {
      status: 404,
      headers: {'Content-type': 'application/json'}
    })
    window.fetch.returns(Promise.resolve(res))
    spyOn(emitter, 'emit')

    validate({token: 'abc', x: '123'}).then(() => {
    }, () => {
      expect(emitter.emit.calls[0].arguments).toInclude('server:error')
      expect.restoreSpies()
      done()
    })
  })
})
