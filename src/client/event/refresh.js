import cache from '../cache'
import emitter from '../../lib/emitter'

import insertImg from '../puzzle/insertImg'
import fetchImg from '../puzzle/fetchImg'
import curry from 'lodash/curry'

emitter.on('refresh', () => {
  const {root} = cache

  fetchImg().then(curry(insertImg)(root)).then(() => {
    const {bg, puzzleBg, puzzle, token, hint, tip} = cache

    bg.style.opacity = 1
    puzzle.style.opacity = 0
    puzzleBg.style.opacity = 0
    hint.style.opacity = 1

    tip.className = 'tip'

    cache.set({
      enable: true,
      token,
    })
    emitter.emit('reset')
  }, () => {
    emitter.emit('server:error')
  })
})
