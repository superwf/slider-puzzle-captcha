import config from '../../config'
import add from 'lodash/add'
import subtract from 'lodash/subtract'
// import puzzlePosition from './position'

function randomBool() {
  return Math.random() > 0.5
}

// 生成puzzle形状
export default position => {
  const line1Arc = randomBool()
  const line1ArcDir = line1Arc && randomBool() ? add : subtract

  const line2Arc = randomBool()
  const line2ArcDir = line2Arc && randomBool() ? add : subtract

  const line3Arc = !(line1Arc || line2Arc) ? true : randomBool()
  const line3ArcDir = line3Arc && randomBool() ? add : subtract

  const line4Arc = !(line1Arc || line3Arc) ? true : randomBool()
  const line4ArcDir = line4Arc && randomBool() ? add : subtract

  const {puzzleSide, slotRadius} = config
  const {x, y} = position
  return (ctx, cb) => {
    ctx.beginPath()
    ctx.moveTo(x, y)
    if (line1Arc) {
      ctx.lineTo(x + puzzleSide / 2 - slotRadius, y)
      ctx.quadraticCurveTo(x + puzzleSide / 2, line1ArcDir(y, slotRadius), x + (puzzleSide / 2 + slotRadius), y)
    }
    ctx.lineTo(x + puzzleSide, y)
    if (line2Arc) {
      ctx.lineTo(x + puzzleSide, y + puzzleSide / 2 - slotRadius)
      let x1 = x + puzzleSide
      ctx.quadraticCurveTo(line2ArcDir(x1, slotRadius), y + puzzleSide / 2, x1, y + (puzzleSide / 2 + slotRadius))
    }
    ctx.lineTo(x + puzzleSide, y + puzzleSide)

    if (line3Arc) {
      // let x1 = x + puzzleSide
      let y1 = y + puzzleSide
      ctx.lineTo(x + puzzleSide / 2 + slotRadius, y1)
      ctx.quadraticCurveTo(
        x + puzzleSide / 2, line3ArcDir(y1, slotRadius),
        x + puzzleSide / 2 - slotRadius, y1
      )
    }
    ctx.lineTo(x, y + puzzleSide)

    if (line4Arc) {
      ctx.lineTo(x, y + puzzleSide / 2 + slotRadius)
      ctx.quadraticCurveTo(
        line4ArcDir(x, slotRadius), y + puzzleSide / 2,
        x, y + puzzleSide / 2 - slotRadius
      )
    }
    ctx.lineTo(x, y)
    ctx.closePath()
    cb()
  }
}
