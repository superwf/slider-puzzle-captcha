import cache from '../cache'
import emitter from '../emitter'
import {updateClass} from '../dom'

emitter.on('server:error', () => {
  cache.set({enable: false})
  const {tip} = cache
  updateClass(tip, 'disable', 'remove')
  updateClass(tip, 'fail', 'remove')
  updateClass(tip, 'broken', 'add')
  emitter.emit('notify', '<span class="error">服务器错误</span>请稍后刷新重试')
})
