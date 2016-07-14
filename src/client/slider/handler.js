import eventName from '../eventName'
import cache from '../cache'
import config from '../../config'
import emitter from '../emitter'
import {listen, remove, clientX, updateClass} from '../dom'
import validate from './validate'

const {move, end} = eventName

const startFunc = startEvt => {

  if (eventName.touch) {
    onHover()
  }

  cache.set({startTime: Date.now()})
  if (!cache.enable) {
    return
  }

  const {track, slider, bg, puzzleBg, puzzle, token} = cache
  const maxX = track.clientWidth - slider.offsetWidth
  bg.style.opacity = 0
  puzzle.style.opacity = 1
  puzzleBg.style.opacity = 1

  let originX = slider.offsetLeft
  let startX = clientX(startEvt)

  updateClass(slider, 'move', 'add')

  // 移动的距离
  let offsetX

  let moveFunc = moveEvt => {
    moveEvt.preventDefault()
    let x = clientX(moveEvt) - startX
    offsetX = originX + x
    if (offsetX < 0) {
      offsetX = 0
    }
    if (offsetX > maxX) {
      offsetX = maxX
    }
    slider.style.left = offsetX + 'px'
    puzzle.style.left = offsetX + 'px'
  }

  let endFunc = () => {
    remove(document, move, moveFunc)
    remove(document, end, endFunc)
    cache.set({endTime: Date.now()})
    updateClass(slider, 'move', 'remove')
    // 移动距离最小为一个puzzle边长
    if (offsetX < config.puzzleSide) {
      emitter.emit('validate:failure')
    } else {
      validate({token, x: offsetX}).then(r => {
        if (r.ok) {
          emitter.emit('validate:success')
        } else {
          emitter.emit('validate:failure')
        }
        if (eventName.touch) {
          setTimeout(offHover, 1500)
        }
      })
    }
  }
  listen(document, move, moveFunc)

  listen(document, end, endFunc)
}

let fadeTick
let onHover = () => {
  updateClass(cache.imageContainer, ['animated', 'fadeIn'], 'add')
  clearTimeout(fadeTick)
}
let offHover = () => {
  const hide = () => {
    updateClass(cache.imageContainer, ['animated', 'fadeIn'], 'remove')
  }
  if (eventName.touch) {
    hide()
  } else {
    fadeTick = setTimeout(hide, 1500)
  }
}
export {onHover, offHover, startFunc}
