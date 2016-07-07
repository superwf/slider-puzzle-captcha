import random from 'lodash/random'

// 生成随机颜色
// return 由三个1至255之间的数据组成的数组
// 例如 [3, 42, 223]
const randomRgbDigit = () => [random(255), random(255), random(255)]

// param rgbDigit 由三个1-255之间的数字组成的数组
// 例如[3, 42, 223]
// return String 例如 '#32ef4a'
const rgbDigitToString = color => {
  return '#' + color.map(v => {
    var c = v.toString(16)
    if (c.length === 1) {
      return '0' + c
    }
    return c
  }).join('')
}

// 生成随机色
// return String #e3f8a7
const randomRgbColorString = () => {
  var color = randomRgbDigit()
  return rgbDigitToString(color)
}

const makeJamLine = (ctx, config, times) => {
  if (!times) {
    return
  }

  var randomPosition = () => {
    return [
      random(config.width),
      random(config.height)
    ]
  }

  while (times) {
    ctx.save()

    ctx.beginPath()
    ctx.lineWidth = 2
    ctx.moveTo(...randomPosition())
    ctx.lineTo(...randomPosition())
    ctx.strokeStyle = randomRgbColorString()
    ctx.stroke()
    ctx.closePath()

    ctx.restore()
    times--
  }
}

export default makeJamLine
