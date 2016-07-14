import cache from '../cache'
import emitter from '../emitter'
import {updateClass} from '../dom'

emitter.on('enable', () => {
  cache.set({enable: true})
  const {tip} = cache
  updateClass(tip, 'disable', 'remove')
})
