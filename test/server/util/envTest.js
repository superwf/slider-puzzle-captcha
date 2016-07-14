import Canvas from 'canvas'
import {isProduction} from '../../../src/server/util/env'
import expect from 'expect'

describe('env', () => {
  it('isProduction', () => {
    expect(isProduction).toBe(false)
  })
})
