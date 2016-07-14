import cache from '../cache'
import emitter from '../emitter'
import {updateClass} from '../dom'
// import eventName from '../../eventName'

let hideTick
emitter.on('notify', (message, autoHideTime) => {
  cache.notify.innerHTML = message
  clearTimeout(hideTick)
  if (autoHideTime) {
    hideTick = setTimeout(() => {
      updateClass(cache.notify, 'active', 'remove')
    }, autoHideTime)
  }
  updateClass(cache.notify, 'active', 'add')
})
