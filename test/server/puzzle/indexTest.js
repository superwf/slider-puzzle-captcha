import Canvas from 'canvas'
import puzzle from '../../../src/server/puzzle'
import position from '../../../src/server/puzzle/position'
import randomBackground from '../../../src/server/util/randomBackground'
import shape from '../../../src/server/puzzle/shape'
import config from '../../../src/config'
import expect from 'expect'

describe('puzzle', () => {
  it('index', () => {
    const pos = position()
    let shapeFunc = shape(pos)

    const canvas = new Canvas(config.bgWidth, config.bgHeight)
    const ctx = canvas.getContext('2d')
    randomBackground.render(ctx)

    let originData = canvas.toDataURL()
    let changedData = puzzle(originData, shapeFunc, pos)
    expect(originData).toNotEqual(changedData)

  })
})
