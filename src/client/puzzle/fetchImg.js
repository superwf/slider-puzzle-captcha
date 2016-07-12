import 'isomorphic-fetch'
import config from '../../config'
import emitter from '../../lib/emitter'

const {api} = config

// 从api获取puzzle图像
const fetchImg = () => {
  return fetch(api.captcha, {
    headers: {
      Accept: 'application/json'
    }
  }).then(res => {
    if (res.status !== 200) {
      emitter.emit('server:error')
      return
    }
    return res.json().then(data => {
      if (data.ok) {
        return data
      }
      throw data
    }, err => console.log('in fetchImg, json err ' + err))
  }, err => {
    emitter.emit('server:error')
  })
}

export default fetchImg
