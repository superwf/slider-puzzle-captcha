import {updateClass} from '../dom'
import cache from '../cache'
import camelCase from 'lodash/camelCase'


/* 插入获取的图片
 * @param {Node}
 * @param {Object} image data
 * @return {Object}
 * */
const insertImg = (root, data) => {
  let result = {}
  let images = root.querySelector('.images')
  if (!images) {
    images = document.createElement('div')
    images.classList.add('images')
    root.insertBefore(images, root.firstChild)
  }
  const createImg = () => {
    return document.createElement('img')
  }
  const insert = className => {
    const originImg = root.querySelector('img.' + className)
    if (originImg) {
      originImg.src = data[className]
      result[camelCase(className)] = originImg
    } else {
      const img = createImg()
      img.src = data[className]
      result[camelCase(className)] = img
      updateClass(img, className, 'add')
      images.insertBefore(img, images.firstChild)
    }
  }
  ['bg', 'puzzle-bg', 'puzzle'].forEach(insert)
  result.token = data.token

  cache.set(result)

  // const track = document.querySelector('.track')
}

export default insertImg
