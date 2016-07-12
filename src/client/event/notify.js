import cache from '../cache'
import emitter from '../../lib/emitter'
import {updateClass} from '../dom'
// import eventName from '../../eventName'

emitter.on('notify', message => {
  cache.notify.innerHTML = message

  updateClass(cache.notify, 'active', 'add')
})

emitter.on('notify:hide', () => {
  updateClass(cache.notify, 'active', 'remove')
})
