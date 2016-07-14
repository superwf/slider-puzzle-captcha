import Canvas from 'canvas'
import config from '../../config'

const img = new Canvas.Image()
const canvas = new Canvas(config.bgWidth, config.bgHeight)
const ctx = canvas.getContext('2d')

const puzzledBg = (data, shape) => {
  ctx.clearRect(0, 0, config.bgWidth, config.bgHeight)
  img.src = data
  ctx.drawImage(img, 0, 0)
  shape(ctx, () => {
    ctx.save()
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'
    ctx.fill()
    ctx.restore()

    ctx.save()
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)'
    ctx.shadowBlur = 5
    ctx.shadowColor = 'rgba(0, 0, 0, 1)'
    ctx.clip()
    ctx.stroke()
    ctx.restore()
  })
  return canvas.toDataURL()
}

export default puzzledBg
