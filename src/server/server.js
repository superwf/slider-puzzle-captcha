import express from 'express'
import bodyParser from 'body-parser'
// import logger from 'morgan'

import {isProduction} from './util/env'
import captcha from './controller/captcha'
import validate from './controller/validate'

import config from '../config'

const app = express()
app.use(bodyParser.json())
// app.use(logger())

if (!isProduction) {
  app.use(express.static(
    __dirname + '/../../public'
  ))
}

const {api, port} = config

app.get(api.captcha, captcha)
app.post(api.validate, validate)

app.listen(port)
console.info(`app start to listen port ${port}`)

if (!isProduction) {
  process.on('message', () => process.send({connected: true}))
}
