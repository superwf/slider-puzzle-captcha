import config from '../../config'
import emitter from '../../lib/emitter'

const validate = async function(post = {token: '', x: ''}) {

  let result = await window.fetch(config.api.validate, {
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
  return result
}
export default validate
