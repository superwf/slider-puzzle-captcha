import Canvas from 'canvas'
import config from '../../config'

const {slotRadius, puzzleSide, bgWidth, bgHeight} = config
const sideLength = puzzleSide + slotRadius * 2
const canvas = new Canvas(bgWidth, bgHeight)
const ctx = canvas.getContext('2d')
let img = new Canvas.Image()

const img1 = new Canvas.Image()
const canvas1 = new Canvas(sideLength, bgHeight)
const ctx1 = canvas1.getContext('2d')

const puzzle = (data, shape, position) => {
  ctx.clearRect(0, 0, bgWidth, bgHeight)
  ctx1.clearRect(0, 0, bgWidth, bgHeight)
  img.src = data
  ctx.drawImage(img, 0, 0)
  shape(ctx, () => {
    ctx.save()
    ctx.globalCompositeOperation = 'destination-in'
    ctx.fill()
    ctx.restore()

    // 外侧阴影
    ctx.save()
    ctx.shadowBlur = 4
    ctx.shadowColor = '#000'
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)'
    ctx.globalCompositeOperation = 'destination-over'
    ctx.stroke()
    ctx.restore()
  })

  img1.src = canvas.toDataURL()
  const {x} = position
  ctx1.drawImage(img1, x - slotRadius, 0, sideLength, bgHeight, 0, 0, sideLength, bgHeight)
  return canvas1.toDataURL()
}

export default puzzle
