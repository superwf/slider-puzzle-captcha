import Canvas from 'canvas'
import config from '../../config'

const puzzle = (data, shape, position) => {

  return new Promise(resolve => {
    const {slotRadius, puzzleSide, bgWidth, bgHeight} = config

    const sideLength = puzzleSide + slotRadius * 2

    let canvas = new Canvas(bgWidth, bgHeight)
    let img = new Canvas.Image()
    img.onload = () => {
      let ctx = canvas.getContext('2d')
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

      const img1 = new Canvas.Image()
      img1.onload = () => {
        const canvas1 = new Canvas(sideLength, bgHeight)
        const ctx1 = canvas1.getContext('2d')
        const {x} = position
        ctx1.drawImage(img1, x - slotRadius, 0, sideLength, bgHeight, 0, 0, sideLength, bgHeight)
        resolve(canvas1.toDataURL())
        // console.log(canvas1.toDataURL())
      }
      img1.src = canvas.toDataURL()
    }
    img.src = data

  })
}

export default puzzle
