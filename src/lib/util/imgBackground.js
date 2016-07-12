import random from 'lodash/random'
import config from '../../config'
import fs from 'fs'
import Canvas from 'canvas'

// let length = bgList.length
const bgList = fs.readdirSync(config.bgPath)
const length = bgList.length - 1

const imgDataList = bgList.map(path => {
  let data = fs.readFileSync(config.bgPath + path).toString('base64')
  data = 'data:image/png;base64,' + data
  return data
})
const background = {
  render: ctx => {
    return new Promise(resolve => {
      const i = random(length)
      const img = new Canvas.Image()
      img.onload = () => {
        ctx.drawImage(img, 0, 0)
        resolve()
      }
      img.src = imgDataList[i]
    })
  }
}

export default background
