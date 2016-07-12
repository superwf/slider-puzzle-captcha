import initDomTree from '../../src/client/initDomTree'
import cache from '../../src/client/cache'
import expect from 'expect'

describe('initDomTree', () => {
  it('initDomTree', () => {
    const root = document.createElement('div')

    initDomTree(root)

    const imageContainer = root.querySelector('.image-container')
    const operation = root.querySelector('.operation')
    const images = root.querySelector('.images')
    const notify = root.querySelector('.notify')
    const controll = root.querySelector('.controll')
    const refresh = root.querySelector('.refresh')
    const track = root.querySelector('.track')
    const slider = root.querySelector('.slider')
    const hint = root.querySelector('.hint')
    const tip = root.querySelector('.tip')

    expect(root.contains(imageContainer)).toBe(true)
    expect(root.contains(operation)).toBe(true)
    expect(imageContainer.contains(images)).toBe(true)
    expect(imageContainer.contains(controll)).toBe(true)
    expect(images.contains(notify)).toBe(true)
    expect(controll.contains(refresh)).toBe(true)
    expect(operation.contains(track)).toBe(true)
    expect(operation.contains(tip)).toBe(true)
    expect(track.contains(slider)).toBe(true)
    expect(track.contains(hint)).toBe(true)

    expect('root' in cache).toBe(true)
    expect('imageContainer' in cache).toBe(true)
    expect('images' in cache).toBe(true)
    expect('notify' in cache).toBe(true)
    expect('controll' in cache).toBe(true)
    expect('refresh' in cache).toBe(true)
    expect('operation' in cache).toBe(true)
    expect('track' in cache).toBe(true)
    expect('slider' in cache).toBe(true)
    expect('tip' in cache).toBe(true)
    expect('hint' in cache).toBe(true)

  })
})
