import Canvas from 'canvas'
import config from '../../config'

const puzzledBg = (data, shape) => {
  const canvas = new Canvas(config.bgWidth, config.bgHeight)
  const img = new Canvas.Image()
  img.src = data
  const ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0)
  shape(ctx, () => {
    ctx.save()
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
    ctx.fill()
    ctx.restore()

    ctx.save()
    ctx.strokeStyle = 'rgba(0, 0, 0, 0)'
    ctx.shadowBlur = 5
    ctx.shadowColor = 'rgba(0, 0, 0, 1)'
    ctx.clip()
    ctx.stroke()
    ctx.restore()
  })

  // ctx.moveTo(30, 30)
  // ctx.lineTo(130, 30)
  // ctx.lineTo(130, 130)
  // ctx.lineTo(30, 130)
  // ctx.lineTo(30, 30)
  // ctx.stroke()
  return canvas.toDataURL()
}

export default puzzledBg
