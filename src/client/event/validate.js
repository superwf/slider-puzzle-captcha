import config from '../../config'
import cache from '../cache'
import emitter from '../emitter'
import {updateClass} from '../dom'

emitter.on('validate:success', () => {
  emitter.emit('disable')
  updateClass(cache.root, 'ok', 'add')
  updateClass(cache.tip, 'ok', 'add')
  cache.puzzle.style.opacity = 0
  cache.puzzleBg.style.opacity = 0
  cache.bg.style.opacity = 1
  cache.hint.style.opacity = 0

  const elapsedTime = (cache.endTime - cache.startTime) / 1000
  emitter.emit('notify', `<span class="success">验证成功</span>此次验证用时${elapsedTime}秒`, 1500)
})

emitter.on('validate:failure', () => {
  if ('failureCount' in cache) {
    if (cache.failureCount >= config.maxRetry) {
      emitter.emit('notify', '<span class="error">失败过多</span>，请稍后重试')
      cache.destroy()
      return
    }
    cache.failureCount++
  } else {
    cache.failureCount = 1
  }

  updateClass(cache.tip, 'fail', 'add')
  emitter.emit('notify', '<span class="error">验证失败</span>，请重新拖动拼图', 2000)
  setTimeout(() => {
    updateClass(cache.tip, 'fail', 'remove')
    emitter.emit('reset')
  }, 500)
})
