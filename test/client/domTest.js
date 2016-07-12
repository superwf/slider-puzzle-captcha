import {listen, remove, clientX, hover, updateClass} from '../../src/client/dom'
import eventName from '../../src/client/eventName'
import expect, {createSpy} from 'expect'

describe('event', () => {
  describe('with dom', () => {
    let div
    beforeEach(() => {
      div = document.createElement('div')
      document.body.appendChild(div)
    })

    afterEach(() => {
      document.body.removeChild(div)
      expect.restoreSpies()
    })

    it('listen', () => {
      let spy = createSpy()
      listen(div, 'click', spy)
      div.dispatchEvent(new MouseEvent('click'))
      expect(spy).toHaveBeenCalled()
    })

    it('remove', () => {
      let spy = createSpy()
      listen(div, 'click', spy)
      remove(div, 'click', spy)
      div.dispatchEvent(new MouseEvent('click'))
      expect(spy).toNotHaveBeenCalled()
    })

    it('clientX', () => {
      let e = new MouseEvent('mousedown', {clientX: 100})
      expect(clientX(e)).toBe(100)

      let touchEvt = new Touch({identifier: 1, target: document.body, clientX: 200})
      e = new TouchEvent('touchstart', {touches: [touchEvt]})
      expect(clientX(e)).toBe(200)
    })

    it('hover', () => {
      expect(eventName.onHover).toBe('mouseover')
      expect(eventName.offHover).toBe('mouseout')
      let spy = createSpy()
      hover(div, spy)
      let overEvt = new MouseEvent('mouseover')
      let outEvt = new MouseEvent('mouseout')
      div.dispatchEvent(overEvt)
      div.dispatchEvent(overEvt)
      expect(spy.calls.length).toBe(1)

      div.dispatchEvent(outEvt)
      div.dispatchEvent(overEvt)
      expect(spy.calls.length).toBe(2)
    })

    it('updateClass', () => {
      expect(div.classList.length).toBe(0)
      updateClass(div, 'abc', 'add')
      expect(div.classList.length).toBe(1)
      expect(div.classList.contains('abc')).toBeTruthy()
      updateClass(div, 'abc', 'remove')
      expect(div.classList.length).toBe(0)
      expect(div.classList.contains('abc')).toBeFalsy()
    })
  })
})
