import Canvas from 'canvas'
import config from '../../config'

const puzzle = (data, shape, position) => {
  const {slotRadius, puzzleSide, bgWidth, bgHeight} = config

  const sideLength = puzzleSide + slotRadius * 2

  let canvas = new Canvas(bgWidth, bgHeight)
  let img = new Canvas.Image()
  img.src = data
  let ctx = canvas.getContext('2d')

  ctx.drawImage(img, 0, 0)
  shape(ctx, () => {
    ctx.save()
    ctx.globalCompositeOperation = 'destination-in'
    ctx.fill()
    ctx.restore()

    // 内测阴影
    ctx.save()
    ctx.shadowBlur = 5
    ctx.shadowColor = 'rgba(6, 134, 190, 1)'
    ctx.strokeStyle = 'rgba(6, 134, 190, 0.1)'
    ctx.clip()
    ctx.stroke()
    ctx.restore()

    // 外侧阴影
    ctx.save()
    ctx.shadowBlur = 5
    ctx.shadowColor = 'rgba(0, 255, 0, 1)'
    ctx.strokeStyle = 'rgba(0, 0, 0, 0)'
    // ctx.globalCompositeOperation = 'copy'
    ctx.stroke()
    ctx.restore()
  })

  img = new Canvas.Image()
  img.src = canvas.toDataURL()
  canvas = new Canvas(sideLength, bgHeight)
  ctx = canvas.getContext('2d')
  const {x, y} = position
  ctx.drawImage(img, x - slotRadius, 0, sideLength, bgHeight, 0, 0, sideLength, bgHeight)
  return canvas.toDataURL()

}

export default puzzle
