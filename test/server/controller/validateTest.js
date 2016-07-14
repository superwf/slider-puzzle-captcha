import request from 'supertest'
import express from 'express'
import bodyParser from 'body-parser'
import validate from '../../../src/server/controller/validate'
import store from '../../../src/server/store'
import config from '../../../src/config'
import expect from 'expect'

describe('controller validate', () => {
  let app
  beforeEach(() => {
    app = express()
    app.use(bodyParser.json())
  })
  it('without param', done => {

    app.post(config.api.validate, validate)
    request(app).post(config.api.validate)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      const data = res.body
      expect(data.ok).toBe(false)
      done()
    })
  })

  it('with param token', done => {
    app.post(config.api.validate, validate)

    request(app).post(config.api.validate)
    .set('Content-type', 'application/json')
    .set('Accept', 'application/json')
    .send({token: 'abc'})
    .expect('Content-Type', /json/)
    .end((err, res) => {
      const data = res.body
      expect(data.ok).toBe(false)
      done()
    })
  })

  it('with param token and x', done => {
    app.post(config.api.validate, validate)

    request(app).post(config.api.validate)
    .set('Content-type', 'application/json')
    .set('Accept', 'application/json')
    .send({token: 'abc', x: '1234'})
    .expect('Content-Type', /json/)
    .end((err, res) => {
      const data = res.body
      expect(data.ok).toBe(false)
      done()
    })
  })

  it('with the right param token and x', done => {
    app.post(config.api.validate, validate)

    let param = {
      token: 'testtoken',
      x: '834',
      time: Date.now(),
    }
    store.set(param.token, param)

    request(app).post(config.api.validate)
    .set('Content-type', 'application/json')
    .set('Accept', 'application/json')
    .send(param)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      const data = res.body
      expect(data.ok).toBe(true)
      done()
    })
  })
})
