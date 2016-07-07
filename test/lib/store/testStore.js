import expect from 'expect'
import config from '../../../src/config'
import generateToken from '../../../src/lib/util/generateToken'

const testStore = store => () => {
  afterEach(() => {
    store.clear(true)
  })
  it('set', () => {
    expect(typeof store.set === 'function')
  })

  it('get exist val', done => {
    store.set('name', {key: 'abc'})
    store.get('name').then(name => {
      expect(name).toEqual({key: 'abc'})
      done()
    })
  })

  it('get not exist val', done => {
    store.get('xxxxxxxxxx').then(() => {}, err => {
      expect(err).toBe(undefined)
      done()
    })
  })

  it('keys', done => {
    store.set('key1', 'key1')
    store.set('key2', 'key2')
    store.keys().then(keys => {
      expect(keys.length).toBe(2)
      expect(keys).toInclude('key1')
      expect(keys).toInclude('key2')
      done()
    }, err => {
      console.log(err)
    })
  })

  it('remove', done => {
    store.set('name', 'www')
    store.get('name').then(name => {
      expect(name).toBe('www')
      store.remove('name')
      store.get('name').then(() => {}, err => {
        expect(err).toBe(undefined)
        done()
      })
    })
  })

  it('clear expired', done => {
    let key = generateToken()
    store.set(key, {
      time: Date.now() - config.expire - 1
    })
    store.clear().then(() => {
      store.get(key).catch(err => {
        expect(err).toBe(undefined)
        done()
      })
    })
  })

  it('not expired will not be cleared', done => {
    let key = generateToken()
    let value = {
      time: Date.now() - config.expire + 1
    }
    store.set(key, value)
    store.clear().then(() => {
      store.get(key).then(val => {
        expect(val).toEqual(value)
        done()
      })
    })
  })
}

export default testStore
