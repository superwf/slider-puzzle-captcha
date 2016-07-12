import express from 'express'
import bodyParser from 'body-parser'
// import logger from 'morgan'

import background from '../lib/util/background'
import Canvas from 'canvas'
import puzzle from '../lib/puzzle'
import puzzledBg from '../lib/puzzle/background'
import puzzleShape from '../lib/puzzle/shape'
import puzzlePosition from '../lib/puzzle/position'
import {isProduction} from '../lib/util/env'
import store from '../lib/store/index'

import generateToken from '../lib/util/generateToken'
import config from '../config'
import allowIp from './allowIp'

const app = express()
app.use(bodyParser.json())
// app.use(logger())

app.use(express.static(
  __dirname + '/../../public'
))

const {api} = config

app.get(api.captcha, captcha)
app.post(api.validate, validate)

// 每次生成的令牌与位置
// let tokens = {}

function captcha(req, res) {
  res.format({
    'application/json': () => {
      if (!allowIp(req.ip)) {
        res.send(JSON.stringify({ok: false, message: 'no auth'}))
        return
      }
      const width = config.bgWidth, height = config.bgHeight
      const canvas = new Canvas(width, height)
      const canvasCtx = canvas.getContext('2d')
      // canvasCtx.fillStyle = '#0f0'
      background.render(canvasCtx).then(() => {
        const bg = canvas.toDataURL()
        const position = puzzlePosition()
        let token = generateToken()
        store.set(token, {
          x: position.x - config.slotRadius,
          time: Date.now()
        })

        const shape = puzzleShape(position)
        Promise.all([puzzle(bg, shape, position), puzzledBg(bg, shape)]).then(result => {
          let body = {ok: true, bg, puzzle: result[0], 'puzzle-bg': result[1], token}
          res.send(JSON.stringify(body))
        })
      })
    }
  })
}

function validate(req, res) {
  res.format({
    'application/json': () => {
      // res.sendStatus(404)
      let ok = false
      let post = req.body
      const response = () => {
        res.send(JSON.stringify({ok}))
      }
      store.get(post.token).then(position => {
        if (Math.abs(post.x - position.x) < config.allowedDistance) {
          ok = true
        }
        response()
      }, err => {
        // 若没有找到token说明已经过期被清除，应提示刷新重试
        if (err === null) {
          res.send(JSON.stringify({ok, expired: true}))
        }
      })
    }
  })
}

const port = config.port
app.listen(port)
console.info(`app start to listen port ${port}`)

if (!isProduction) {
  process.on('message', () => process.send({connected: true}))
}
