import fetchImg from '../../../src/client/puzzle/fetchImg'
import expect from 'expect'
import config from '../../../src/config'

import fakeFetch from '../fakeFetch'

describe('fetchImg', () => {
  beforeEach(() => {
    fakeFetch.create()

    fakeFetch.response({
      ok: true,
      bg: 'abc',
      puzzle: 'puzzle',
      token: 'token',
      'puzzle-bg': 'puzzle-bg',
    }, config.api.captcha)
  })

  afterEach(() => {
    fakeFetch.destroy()
  })

  it('fetch', done => {
    fetchImg().then(data => {
      expect('bg' in data).toBe(true)
      expect('puzzle' in data).toBe(true)
      expect('token' in data).toBe(true)
      expect('puzzle-bg' in data).toBe(true)
      done()
    })
  })
})
