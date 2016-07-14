import puzzle from '../../../src/client/puzzle'
import initDomTree from '../../../src/client/initDomTree'
import expect from 'expect'
import config from '../../../src/config'
import fakeFetch from '../fakeFetch'

describe('puzzle', done => {

  beforeEach(() => {
    fakeFetch.create()

    fakeFetch.response({
      ok: true,
      bg: '',
      puzzle: '',
      token: 'token',
      'puzzle-bg': '',
    }, config.api.captcha)
  })

  afterEach(() => {
    fakeFetch.destroy()
  })

  it('index', () => {
    let div = document.createElement('div')
    initDomTree(div)

    expect(div.querySelector('img')).toBe(null)

    puzzle().then(() => {
      expect(div.querySelectorAll('img').length).toBe(3)
      done()
    })

  })
})
