import request from 'supertest'
import express from 'express'
import captcha from '../../../src/server/controller/captcha'
import config from '../../../src/config'
import expect from 'expect'

describe('controller', () => {
  it('captcha', done => {
    let app = express()

    app.get(config.api.captcha, captcha)

    request(app).get(config.api.captcha)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      const data = res.body
      expect('ok' in data).toBeTruthy()
      expect('puzzle' in data).toBeTruthy()
      expect('puzzle-bg' in data).toBeTruthy()
      expect('bg' in data).toBeTruthy()
      expect('token' in data).toBeTruthy()
      done()
    })
  })
})
