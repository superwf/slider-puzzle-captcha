import MicroEvent from 'microevent'

const emitter = new MicroEvent()
emitter.on = emitter.bind
emitter.emit = emitter.trigger
emitter.off = emitter.unbind

// 清空所有事件，只在测试代码中使用
// emitter.clear = () => {
//   emitter._events = {}
// }

export default emitter
