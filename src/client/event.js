const touch = 'ontouchstart' in window
const evt = {
  start: touch ? 'touchstart' : 'mousedown',
  move: touch ? 'touchmove' : 'mousemove',
  end: touch ? 'touchend' : 'mouseup',
}

const listen = (elem, evt, func) => {
  elem.addEventListener(evt, func, false)
}

const remove = (elem, evt, func) => {
  elem.removeEventListener(evt, func)
}

const clientX = e => {
  if (e.type.indexOf('mouse') > -1) {
    return e.clientX
  }
  if (e.type.indexOf('touch') > -1) {
    return e.touches[0].clientX
  }
}

export {evt, listen, remove, clientX}
