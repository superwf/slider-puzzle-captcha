import cache from '../cache'
import emitter from '../emitter'
import {updateClass} from '../dom'

emitter.on('reset', () => {
  const {slider, puzzle} = cache
  updateClass(puzzle, ['animated', 'flash'], 'add')
  emitter.emit('disable')

  setTimeout(() => {
    let speed = 4
    let tick = setInterval(() => {
      if (slider.offsetLeft > 0) {
        let left = slider.offsetLeft - speed
        if (left < 0) {
          left = 0
        }
        left += 'px'
        slider.style.left = left
        puzzle.style.left = left
      } else {
        clearInterval(tick)
        updateClass(puzzle, ['animated', 'flash'], 'remove')
        emitter.emit('enable')
        updateClass(cache.root, 'ok', 'remove')
        updateClass(cache.tip, 'ok', 'remove')
      }
    }, 5)
  }, 500)
})
