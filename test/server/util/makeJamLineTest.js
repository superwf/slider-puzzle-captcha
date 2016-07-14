import Canvas from 'canvas'
import makeJamLine from '../../../src/server/util/makeJamLine'
import config from '../../../src/config'
import expect from 'expect'

describe('makeJamLine', () => {
  it('make some random line on canvas', () => {
    const canvas = new Canvas(config.bgWidth, config.bgHeight)
    const ctx = canvas.getContext('2d')
    let originData = canvas.toDataURL()

    makeJamLine(ctx, {width: config.bgWidth, height: config.bgHeight}, 10)
    let changedData = canvas.toDataURL()
    expect(originData).toNotEqual(changedData)
  })
})
