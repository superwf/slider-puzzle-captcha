import position from '../../../src/server/puzzle/position'
import config from '../../../src/config'
import expect from 'expect'

describe('puzzle/position', () => {
  it('make shure position x, y are within img width and height', () => {
    for(let i = 0; i < 100; i++) {
      const {x, y} = position()
      expect(x > 0).toBe(true)
      expect(x < config.bgWidth).toBe(true)
      expect(y > 0).toBe(true)
      expect(y < config.bgHeight).toBe(true)
    }
  })
})
