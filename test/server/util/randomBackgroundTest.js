import Canvas from 'canvas'
import randomBackground from '../../../src/server/util/randomBackground'
import config from '../../../src/config'
import expect from 'expect'

describe('randomBackground', () => {
  it('render', () => {
    const canvas = new Canvas(config.bgWidth, config.bgHeight)
    const ctx = canvas.getContext('2d')
    let originData = canvas.toDataURL()

    randomBackground.render(ctx)
    let changedData = canvas.toDataURL()
    expect(originData).toNotEqual(changedData)
  })
})
