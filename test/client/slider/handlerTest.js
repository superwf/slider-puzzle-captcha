import {startFunc, onHover, offHover} from '../../../src/client/slider/handler'
import expect, {spyOn} from 'expect'
import initDomTree from '../../../src/client/initDomTree'
import insertImg from '../../../src/client/puzzle/insertImg'
import cache from '../../../src/client/cache'
import config from '../../../src/config'
import emitter from '../../../src/client/emitter'
import fakeFetch from '../fakeFetch'

describe('slider', function() {
  this.timeout(5000)
  let div

  beforeEach(() => {
    div = document.createElement('div')
    initDomTree(div)
    insertImg(div, {
      bg: '',
      puzzle: '',
      puzzleBg: '',
      token: '',
    })
    document.body.appendChild(div)
  })

  afterEach(() => {
    document.body.removeChild(div)
  })

  it('startFunc', () => {
    const startEvt = new MouseEvent('mousedown', {clientX: 100})
    const {bg, puzzle, puzzleBg, slider} = cache
    slider.parentNode.style.position = 'relative'
    slider.parentNode.style.height = '50px'
    slider.parentNode.style.width = '300px'
    slider.style.position  = 'absolute'
    slider.style.height  = '30px'
    slider.style.width  = '30px'

    expect('startTime' in cache).toBe(false)
    expect('endTime' in cache).toBe(false)

    startFunc(startEvt)
    expect(cache.enable).toBe(true)
    expect('startTime' in cache).toBe(true)
    expect(bg.style.opacity).toBe('0')
    expect(puzzle.style.opacity).toBe('1')
    expect(puzzleBg.style.opacity).toBe('1')
    expect(slider.classList.contains('move')).toBe(true)

    expect(slider.style.left).toBe('')
    
    const moveEvt = new MouseEvent('mousemove', {clientX: 150})
    document.dispatchEvent(moveEvt)
    expect(slider.style.left).toBe('50px')

    const endEvt = new MouseEvent('mouseup', {clientX: 150})


    fakeFetch.create()
    fakeFetch.response({
      ok: false,
    }, config.api.validate)
    document.dispatchEvent(endEvt)
    expect('endTime' in cache).toBe(true)
    expect(slider.classList.contains('move')).toBe(false)

    fakeFetch.destroy()
  })

  it('onHover', () => {
    const {imageContainer} = cache
    onHover()
    expect(imageContainer.classList.contains('animated')).toBe(true)
    expect(imageContainer.classList.contains('fadeIn')).toBe(true)
  })

  it('offHover', done => {
    const {imageContainer} = cache
    onHover()
    expect(imageContainer.classList.contains('animated')).toBe(true)
    expect(imageContainer.classList.contains('fadeIn')).toBe(true)
    offHover()
    setTimeout(() => {
      expect(imageContainer.classList.contains('animated')).toBe(false)
      expect(imageContainer.classList.contains('fadeIn')).toBe(false)
      done()
    }, 1501)
  })
})
