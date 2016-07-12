import config from '../config'
import cache from './cache'

// 初始化html结构并且将所有node缓存
const init = root => {
  // 如果已经初始化过
  if (root.querySelector('.image-container')) {
    return false
  }

  root.setAttribute('tabeindex', '-1')
  const appendByClass = (className, parentNode = root) => {
    const dom = document.createElement('div')
    dom.classList.add(className)
    parentNode.appendChild(dom)
    return dom
  }

  const imageContainer = appendByClass('image-container')

  const images = appendByClass('images', imageContainer)
  const notify = appendByClass('notify', images)

  const controll = appendByClass('controll', imageContainer)
  const refresh = appendByClass('refresh', controll)

  const operation = appendByClass('operation')
  const track = appendByClass('track', operation)
  const slider = appendByClass('slider', track)
  const hint = appendByClass('hint', track)
  hint.textContent = config.hint
  const tip = appendByClass('tip', operation)

  cache.set({root, imageContainer, images, notify, controll, refresh, operation, track, slider, hint, tip})
}

export default init
