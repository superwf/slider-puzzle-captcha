import 'isomorphic-fetch'
// import Promise from 'es6-promise'
import initDomTree from './initDomTree'
import puzzle from './puzzle'
import slider from './slider'
// Promise.polyfill()

import './event/reset'
import './event/enable'
import './event/disable'
import './event/validate'
import './event/notify'
import './event/refresh'
import './event/error'

const sliderPuzzle = root => {
  initDomTree(root)
  puzzle(root)
  slider()
}
export default sliderPuzzle
