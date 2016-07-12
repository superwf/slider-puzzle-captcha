import Canvas from 'canvas'
import config from '../../config'

const puzzledBg = (data, shape) => {
  const canvas = new Canvas(config.bgWidth, config.bgHeight)
  const img = new Canvas.Image()
  return new Promise(resolve => {
    img.onload = () => {
      const ctx = canvas.getContext('2d')
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
      // console.log(canvas.toDataURL())
      resolve(canvas.toDataURL())
    }
    img.src = data
  })
}

export default puzzledBg
