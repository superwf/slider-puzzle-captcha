import config from '../../config'
import emitter from '../emitter'

const validate = function(post = {token: '', x: ''}) {

  const {api} = config
  return window.fetch(api.validate, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(post)
  }).then(res => {
    if (res.status !== 200) {
      emitter.emit('server:error')
    }
    return res.json().then(json => {
      if (json.expired) {
        emitter.emit('token:expired')
      }
      return json
    })
  }, err => {
    console.log(`fetch ${api.validate} err `, err)
    emitter.emit('server:error')
  })
}
export default validate
