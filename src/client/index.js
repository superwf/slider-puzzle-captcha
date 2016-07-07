import fetch from 'isomorphic-fetch'
import config from '../config'
import Slider from './slider'

import Promise from 'es6-promise'
Promise.polyfill()

window.addEventListener('load', () => {

  fetch('/captcha').then((res) => {
    // console.log(res.json().then)
    res.json().then(data => {
      const imgContainer = document.querySelector('.puzzle-img')

      let i = document.createElement('img')
      i.src = data.bg
      i.classList.add('bg')
      imgContainer.appendChild(i)


      i = document.createElement('img')
      i.src = data.puzzle
      i.classList.add('puzzle')
      imgContainer.appendChild(i)

      i = document.createElement('img')
      i.classList.add('puzzle-bg')
      i.src = data.puzzledBg
      imgContainer.appendChild(i)

      const slider = document.querySelector('.slider')
      Slider(slider, data.token)
    }, err => {
      console.log(err)
    })
  })
})
