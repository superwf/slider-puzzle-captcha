import emitter from '../../lib/emitter'

emitter.on('token:expired', () => {
  emitter.emit('disable')
  emitter.emit('notify', '<span class="error">验证码过期</span>')
  emitter.emit('refresh')
})
