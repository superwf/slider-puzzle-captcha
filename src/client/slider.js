import {evt, listen, remove, clientX} from './event'
import fetch from 'isomorphic-fetch'

function Slider(root, token) {
  const handler = root.querySelector('.handler')
  const slider = root
  const puzzle = document.querySelector('.puzzle')
  const puzzleBg = document.querySelector('.puzzle-bg')
  const bg = document.querySelector('.bg')

  const {start, move, end} = evt
  const startFunc = startEvt => {

    let originX = handler.offsetLeft
    let startX = clientX(startEvt)
    bg.style.opacity = 0
    puzzle.style.opacity = 1
    puzzleBg.style.opacity = 1

    // 移动的距离
    let offsetX

    let moveFunc = moveEvt => {
      moveEvt.preventDefault()
      let x = clientX(moveEvt) - startX
      offsetX = originX + x
      if (offsetX < 0) {
        offsetX = 0
      }
      const maxX = slider.clientWidth - handler.offsetWidth
      if (offsetX > maxX) {
        offsetX = maxX
      }
      handler.style.left = offsetX + 'px'
      puzzle.style.left = offsetX + 'px'
    }

    let endFunc = () => {
      remove(document, move, moveFunc)
      remove(document, end, endFunc)
      fetch('/validate', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({token, x: offsetX})
      }).then(res => {
        if (res.status === 200) {
          return res.json()
        }
        return {ok: false}
      }).then(data => {
        console.log(data)
        if (data.ok) {
          puzzle.parentNode.classList.add('ok')
          puzzle.style.opacity = 0
          puzzleBg.style.opacity = 0
          bg.style.opacity = 1
          remove(handler, start, startFunc)
        } else {
          puzzle.classList.add('animated')
          puzzle.classList.add('flash')
          // bg.style.opacity = 1
          // puzzleBg.style.opacity = 0
          setTimeout(() => {
            let speed = 6
            let tick = setInterval(() => {
              if (handler.offsetLeft > 0) {
                let left = handler.offsetLeft - speed
                if (left < 0) {
                  left = 0
                }
                left += 'px'
                handler.style.left = left
                puzzle.style.left = left
              } else {
                clearInterval(tick)
                // puzzle.style.opacity = 0

                puzzle.classList.remove('animated')
                puzzle.classList.remove('flash')
              }
            }, 5)
          }, 500)
        }
      })
    }
    listen(document, move, moveFunc)

    listen(document, end, endFunc)
  }

  listen(handler, start, startFunc)
}

export default Slider
