import eventName from '../eventName'
import emitter from '../../lib/emitter'
import {listen, hover} from '../dom'

import cache from '../cache'

// events
import {onHover, offHover, startFunc} from './handler'

// slider中绑定事件
const slider = () => {
  const {root, refresh} = cache
  hover(root, onHover, offHover)
  listen(cache.slider, eventName.start, startFunc)
  listen(refresh, eventName.start, () => {
    emitter.emit('refresh')
  })
  cache.set({enable: true})
}

export default slider
