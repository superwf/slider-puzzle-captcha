let touch = false
if (typeof window === 'undefined') {
  window = {}
}
touch = 'ontouchstart' in window

// 根据当前浏览器环境获取事件名称
const evt = {
  touch,
  start: touch ? 'touchstart' : 'mousedown',
  move: touch ? 'touchmove' : 'mousemove',
  end: touch ? 'touchend' : 'mouseup',
  onHover: touch ? 'focus' : 'mouseover',
  offHover: touch ? 'blur' : 'mouseout',
}

export default evt
