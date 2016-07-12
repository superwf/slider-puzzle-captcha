// import config from '../config'
// import once from 'lodash/once'

import 'isomorphic-fetch'
import 'babel-polyfill'
import Promise from 'es6-promise'
// import sliderPuzzle from './sliderPuzzle'
import initDomTree from './initDomTree'
import puzzle from './puzzle'
import slider from './slider'
Promise.polyfill()

import './event/reset'
import './event/enable'
import './event/disable'
import './event/validate'
import './event/notify'
import './event/refresh'
import './event/error'

window.addEventListener('load', () => {
  const root = document.querySelector('.slider-puzzle')
  initDomTree(root)
  puzzle(root)
  slider()
})
