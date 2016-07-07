import config from '../../config'
let store = {}

const fetchKeys = () => {
  return Promise.resolve(Object.keys(store))
}

const remove = key => {
  delete store[key]
}

export default {
  set: (key, val) => {
    store[key] = val
  },

  get: key => {
    const val = store[key]
    if (val !== undefined) {
      return Promise.resolve(val)
    }
    return Promise.reject()
  },

  remove,

  keys: fetchKeys,

  clear: force => {
    if (force) {
      return fetchKeys().then(keys => keys.forEach(remove))
    }
    return fetchKeys().then(keys => {
      const now = Date.now()
      keys.forEach(key => {
        let time = store[key] ? store[key].time : false
        if (time && now - store[key].time > config.expire) {
          remove(key)
        }
      })
    })
  }
}
