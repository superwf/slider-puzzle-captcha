import Canvas from 'canvas'
import imgBackground from '../../../src/server/util/imgBackground'
import config from '../../../src/config'
import expect from 'expect'

describe('imgBackground', () => {
  it('render', () => {
    const canvas = new Canvas(config.bgWidth, config.bgHeight)
    const ctx = canvas.getContext('2d')
    let originData = canvas.toDataURL()

    imgBackground.render(ctx)
    let changedData = canvas.toDataURL()
    expect(originData).toNotEqual(changedData)
  })
})
