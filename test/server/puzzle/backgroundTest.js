import Canvas from 'canvas'
import background from '../../../src/server/puzzle/background'
import position from '../../../src/server/puzzle/position'
import randomBackground from '../../../src/server/util/randomBackground'
import shape from '../../../src/server/puzzle/shape'
import config from '../../../src/config'
import expect from 'expect'

describe('puzzle', () => {
  it('background', () => {
    let shapeFunc = shape(position())

    const canvas = new Canvas(config.bgWidth, config.bgHeight)
    const ctx = canvas.getContext('2d')
    randomBackground.render(ctx)

    let originData = canvas.toDataURL()
    let changedData = background(originData, shapeFunc)
    expect(originData).toNotEqual(changedData)

  })
})
