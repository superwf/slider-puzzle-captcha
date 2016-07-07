import Koa from 'koa'
// import views from 'co-views'
import logger from 'koa-logger'
import router from 'koa-router'
import koaStatic from 'koa-static'
import coBody from 'co-body'

import background from '../lib/util/background'
import Canvas from 'canvas'
import makeJamLine from '../lib/util/makeJamLine'
import puzzle from '../lib/puzzle'
import puzzledBg from '../lib/puzzle/background'
import puzzleShape from '../lib/puzzle/shape'
import puzzlePosition from '../lib/puzzle/position'
import {isProduction} from '../lib/util/env'
import store from '../lib/store/index'

import generateToken from '../lib/util/generateToken'
import config from '../config'

const app = new Koa()

app.use(logger())
app.use(koaStatic(
  __dirname + '/../../public'
))


const route = router()
route.get('/captcha', captcha)
route.post('/validate', validate)
app.use(route.routes())

// 每次生成的令牌与位置
// let tokens = {}

async function captcha(ctx) {
  const width = config.bgWidth, height = config.bgHeight
  const canvas = new Canvas(width, height)
  const context = canvas.getContext('2d')
  context.fillStyle = '#0f0'
  makeJamLine(context, {width, height}, 30)
  background.render(context, width, height)
  const bg = canvas.toDataURL()
  const position = puzzlePosition()
  let token = generateToken()
  store.set(token, {
    x: position.x - config.slotRadius,
    time: Date.now()
  })

  const shape = puzzleShape(position)

  let body = {bg, puzzle: puzzle(bg, shape, position), puzzledBg: puzzledBg(bg, shape), token}

  ctx.body = JSON.stringify(body)
}

async function validate(ctx) {
  let ok = false
  const response = () => {
    ctx.body = JSON.stringify({ok})
  }
  return coBody(ctx).then(d => {
    return store.get(d.token).then(position => {
      if (Math.abs(d.x - position.x) < config.allowedDistance) {
        ok = true
      }
      response()
    }, response)
  }, err => {
    ctx.body = err
    response()
  })

}

const port = config.port
app.listen(port)
console.info(`app start to listen port ${port}`)

if (!isProduction) {
  process.on('message', () => process.send({connected: true}))
}
