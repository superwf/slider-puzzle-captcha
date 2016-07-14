import eventName from '../eventName'
import emitter from '../emitter'
import {listen, hover, remove} from '../dom'

import cache from '../cache'

// events
import {onHover, offHover, startFunc} from './handler'

// slider中绑定事件
const slider = () => {
  const {root, refresh, slider} = cache
  hover(root, onHover, offHover)
  listen(slider, eventName.start, startFunc)

  const refreshFunc = () => {
    emitter.emit('refresh')
  }
  listen(refresh, eventName.start, refreshFunc)
  const removeSlider = () => {
    remove(slider, eventName.start, startFunc)
    remove(refresh, eventName.start, refreshFunc)
  }

  removeSlider.cache = cache
  removeSlider.emitter = emitter
  return removeSlider
}

export default slider
