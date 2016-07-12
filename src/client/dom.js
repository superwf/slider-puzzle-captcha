import eventName from './eventName'
// 添加监听
const listen = (elem, evt, func) => {
  elem.addEventListener(evt, func, false)
}

// 删除监听事件
const remove = (elem, evt, func) => {
  elem.removeEventListener(evt, func)
}

// 获取当前事件x坐标，兼容移动端
const clientX = e => {
  if (e.type.indexOf('mouse') > -1) {
    return e.clientX
  }
  if (e.type.indexOf('touch') > -1) {
    return e.touches[0].clientX
  }
}

/* 监听hover事件
 * @param {Node} elem
 * @param {Function} overFunc hover函数
 * @param {Function} outFunc 鼠标移出函数，可选
 * */
const hover = (elem, overFunc, outFunc) => {
  let over = false
  listen(elem, eventName.onHover, () => {
    if (!over) {
      over = true
      overFunc(elem)
    }
  })

  listen(elem, eventName.offHover, () => {
    over = false
    if (outFunc) {
      outFunc(elem)
    }
  })
}

/* 为元素添加或删除多个class
 * @param {Node}
 * @param {Array, String}
 * @param {String} add, remove or toggle
 * */
const updateClass = (elem, classList, action) => {
  if (Array.isArray(classList)) {
    classList.forEach(c => elem.classList[action](c))
  }
  elem.classList[action](classList)
}

export {listen, remove, clientX, hover, updateClass}
