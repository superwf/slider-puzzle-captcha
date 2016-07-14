import redis from 'redis'
import config from '../../config'

const createStore = () => {
  const client = redis.createClient(config.redisConfig)
  client.on('error', err => {
    console.log('error event - ' + client.host + ':' + client.port + ' - ' + err)
  })

  let store = {
    set: (key, val) => client.set(key, JSON.stringify(val)),
    get: key => {
      return new Promise((resolve, reject) => {
        client.get(key, (err, result) => {
          if (err) {
            reject(err)
          } else if (result === null) {
            reject(null)
          } else {
            try {
              resolve(JSON.parse(result))
            } catch (e) {
              resolve(result)
            }
          }
        })
      })
    },

    keys: () => new Promise((resolve, reject) => {
      client.keys('*', (err, results) => {
        // console.log(results)
        err ? reject(err) : resolve(results)
      })
    }),

    remove: key => {
      client.del(key)
    },

    clear: force => {
      if (force) {
        return store.keys().then(keys => {
          keys.forEach(key => client.del(key))
        })
      }
      return store.keys().then(keys => {
        const now = Date.now()
        return Promise.all(keys.map(key => {
          return store.get(key).then(val => {
            if (val.time && now - val.time > config.expire) {
              client.del(key)
            }
          })
        }))
      })
    }
  }
  return store
}

export default createStore
