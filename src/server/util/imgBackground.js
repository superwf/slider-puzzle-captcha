import Canvas from 'canvas'
import random from 'lodash/random'
import config from '../../config'
import fs from 'fs'

let imgDataList, background
if (config.bgPath) {
  const bgList = fs.readdirSync(config.bgPath)
  const length = bgList.length - 1

  imgDataList = bgList.map(path => {
    let data = fs.readFileSync(config.bgPath + path).toString('base64')
    data = 'data:image/png;base64,' + data
    return data
  })

  const img = new Canvas.Image()
  background = {
    render: ctx => {
      const i = random(length)
      img.src = imgDataList[i]
      ctx.drawImage(img, 0, 0)
    }
  }
} else {
  background = {render: () => {}}
}

export default background
