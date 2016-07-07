import config from '../../config'

import random from 'lodash/random'

export default () => {
  // x坐标从总宽度三分之一开始取
  // puzzle块距离右边至少有一个puzzleSide的距离
  let x = random(config.bgWidth / 3, config.bgWidth - config.puzzleSide * 2)

  // puzzle块距离下边至少有一个puzzleSide的距离
  let y = random(config.puzzleSide / 2, config.bgHeight - config.puzzleSide * 2)
  return {x, y}
}
