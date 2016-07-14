import Canvas from 'canvas'
import background from '../util/background'
import puzzle from '../puzzle'
import puzzledBg from '../puzzle/background'
import puzzleShape from '../puzzle/shape'
import puzzlePosition from '../puzzle/position'
import allowIp from '../allowIp'
import generateToken from '../util/generateToken'
import config from '../../config'
import store from '../store/index'

const width = config.bgWidth, height = config.bgHeight
const canvas = new Canvas(width, height)
const canvasCtx = canvas.getContext('2d')

function captcha(req, res) {
  res.format({
    'application/json': () => {
      // console.log(process.memoryUsage().rss / 1024 / 1024)
      if (!allowIp(req.ip)) {
        res.send(JSON.stringify({ok: false, message: 'no auth'}))
        return
      }
      canvasCtx.clearRect(0, 0, width, height)
      background.render(canvasCtx)
      const bg = canvas.toDataURL()
      const position = puzzlePosition()
      let token = generateToken()
      store.set(token, {
        x: position.x - config.slotRadius,
        time: Date.now()
      })

      let shape = puzzleShape(position)
      let body = {ok: true, bg, puzzle: puzzle(bg, shape, position), 'puzzle-bg': puzzledBg(bg, shape), token}
      shape = null
      res.end(JSON.stringify(body))
    }
  })
}
export default captcha
