import shape from '../../../src/server/puzzle/shape'
import position from '../../../src/server/puzzle/position'
import config from '../../../src/config'
import expect, {createSpy} from 'expect'
import Canvas from 'canvas'

describe('puzzle/shape', () => {
  it('shape generate func and func receive param ctx and callback', () => {
    const config = position()
    let shapeFunc = shape(config)

    const canvas = new Canvas(config.bgWidth, config.bgHeight)
    const ctx = canvas.getContext('2d')
    let spy = createSpy()
    shapeFunc(ctx, spy)
    expect(spy).toHaveBeenCalled()
  })
})
