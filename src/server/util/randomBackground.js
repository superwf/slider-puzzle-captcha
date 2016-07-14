import makeJamLine from './makeJamLine'
import random from 'lodash/random'
import config from '../../config'
/* Close Pixelate
 * http://desandro.com/resources/close-pixelate/
 *
 * Developed by
 * - David DeSandro  http://desandro.com
 * - John Schulz  http://twitter.com/jfsiii
 *
 * Thanks to Max Novakovic for getImageData API http://www.maxnov.com/getimagedata
 *
 * Copyright (c) 2010
 * Licensed under MIT license
 *
 */


/*********************** Close Pixelate ************************/


const ClosePixelate = {
  imgData: null,
  PI2: Math.PI * 2,
  PI1_4: Math.PI / 4
}

function getRandomPixelateSetting() {
  const num = random(1, 8)
  let pixelateSettings
  switch (num) {
  case 1:
    pixelateSettings = [
      {shape: 'diamond', resolution: 98, size: 20, offset: 0, alpha: 1},
      {shape: 'circle', resolution: 20, size: 19, offset: 0, alpha: 1},
      {shape: 'diamond', resolution: 32, size: 103, offset: 0, alpha: 0.04},
      {shape: 'circle', resolution: 50, size: 48, offset: 0, alpha: 0.65},
    ]
    break
  case 2:
    pixelateSettings = [
      {shape: 'diamond', resolution: 14, size: 27, offset: 15, alpha: 0.991},
      {shape: 'circle', resolution: 50, size: 48, offset: 0, alpha: 0.651},
      {shape: 'circle', resolution: 50, size: 23, offset: 8, alpha: 0.5},
      {shape: 'circle', resolution: 50, size: 11, offset: 8, alpha: 0.441}
    ]
    break
  case 3:
    pixelateSettings = [
      {shape: 'diamond', resolution: 200, size: 10, offset: 5, alpha: 0.8},
      {shape: 'diamond', resolution: 70, size: 80, offset: 15, alpha: 0.4},
      {shape: 'diamond', resolution: 112, size: 40, offset: 15, alpha: 0.3},
      {shape: 'diamond', resolution: 50, size: 20, offset: 10, alpha: 0.3},
      {shape: 'diamond', resolution: 32, size: 103, offset: 0, alpha: 0.04}
    ]
    break
  case 4:
    pixelateSettings = [
      {shape: 'circle', resolution: 32, size: 180, offset: 0, alpha: 0.24},
      {shape: 'diamond', resolution: 8, size: 10, offset: 0, alpha: 0.39},
      {shape: 'circle', resolution: 52, size: 30, offset: 0, alpha: 0.26},
      {shape: 'circle', resolution: 40, size: 15, offset: 0, alpha: 0.47}
    ]
    break
  case 5:
    pixelateSettings = [
      {shape: 'square', resolution: 32, offset: 0, size: 4, alpha: 1},
      {shape: 'square', resolution: 32, offset: 0, size: 30, alpha: 0.5},
      {shape: 'diamond', resolution: 32, offset: 0, size: 90, alpha: 0.6}
    ]
    break
  case 6:
    pixelateSettings = [
      {shape: 'circle', resolution: 40, size: 50, offset: 0, alpha: 0.74},
      {shape: 'diamond', resolution: 10, size: 13, offset: 13, alpha: 0.6},
      {shape: 'square', resolution: 86, size: 83, offset: 0, alpha: 0.7},
      {shape: 'circle', resolution: 62, size: 73, offset: 0, alpha: 0.3},
    ]
    break
  case 7:
    pixelateSettings = [
      {shape: 'diamond', resolution: 32, size: 14, offset: 0, alpha: 0.5},
      {shape: 'square', resolution: 86, size: 83, offset: 0, alpha: 0.3},
      {shape: 'diamond', resolution: 200, size: 200, offset: 0, alpha: 0.7},
      {shape: 'circle', resolution: 8, size: 6, offset: 8, alpha: 1}
    ]
    break
  case 8:
    pixelateSettings = [
      {shape: 'diamond', resolution: 32, size: 28, offset: 0, alpha: 0.501},
      {shape: 'diamond', resolution: 194, size: 194, offset: 100, alpha: 0.551},
      {shape: 'diamond', resolution: 32, size: 14, offset: 0, alpha: 0.5},
      {shape: 'circle', resolution: 32, size: 20, offset: 16, alpha: 0.821},
      {shape: 'circle', resolution: 32, size: 7, offset: 0, alpha: 1}
    ]
    break
  }
  return pixelateSettings
}

ClosePixelate.render = function(ctx) {
  const w = config.bgWidth
  const h = config.bgHeight
  makeJamLine(ctx, {width: w, height: h}, 30)
  let renderOptions = getRandomPixelateSetting()

  if (ClosePixelate.imgData == null) {
    ClosePixelate.imgData = ctx.getImageData(0, 0, w, h).data
  }

  ctx.clearRect(0, 0, w, h)

  for (let i = 0, len = renderOptions.length; i < len; i++) {
    let opts = renderOptions[i],
      res = opts.resolution,

      // option defaults
      size = opts.size || res,
      alpha = opts.alpha || 1,
      offset = opts.offset || 0,
      offsetX = 0,
      offsetY = 0,
      cols = w / res + 1,
      rows = h / res + 1,
      halfSize = size / 2,
      diamondSize = size / Math.SQRT2,
      halfDiamondSize = diamondSize / 2

    offsetX = offsetY = offset
    for (let row = 0; row < rows; row++) {
      let y = (row - 0.5) * res + offsetY,
        // normalize y so shapes around edges get color
        pixelY = Math.max(Math.min(y, h - 1), 0)

      for (let col = 0; col < cols; col++) {
        let x = (col - 0.5) * res + offsetX,
          // normalize y so shapes around edges get color
          pixelX = Math.max(Math.min(x, w - 1), 0),
          pixelIndex = (pixelX + pixelY * w) * 4,
          red = ClosePixelate.imgData[pixelIndex + 0],
          green = ClosePixelate.imgData[pixelIndex + 1],
          blue = ClosePixelate.imgData[pixelIndex + 2],
          pixelAlpha = alpha * (ClosePixelate.imgData[pixelIndex + 3] / 255)

        ctx.fillStyle = `rgba(${red},${green},${blue},${pixelAlpha})`

        switch (opts.shape) {
        case 'circle':
          ctx.beginPath()
          ctx.arc(x, y, halfSize, 0, ClosePixelate.PI2, true)
          ctx.fill()
          ctx.closePath()
          break
        case 'diamond':
          ctx.save()
          ctx.translate(x, y)
          ctx.rotate(ClosePixelate.PI1_4)
          ctx.fillRect(-halfDiamondSize, -halfDiamondSize, diamondSize, diamondSize)
          ctx.restore()
          break
        default:
          ctx.fillRect(x - halfSize, y - halfSize, size, size)
        }
      }
    }
  }
}

export default ClosePixelate
