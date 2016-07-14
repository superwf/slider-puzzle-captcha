import cache from '../cache'
import emitter from '../emitter'
import {updateClass} from '../dom'

emitter.on('disable', () => {
  cache.set({enable: false})
  const {tip} = cache
  updateClass(tip, 'disable', 'add')
})
