import background from '../../../src/server/util/background'
import randomBackground from '../../../src/server/util/randomBackground'
import imgBackground from '../../../src/server/util/imgBackground'
import config from '../../../src/config'
import expect from 'expect'

describe('env', () => {
  it('isProduction', () => {
    if (config.bgPath) {
      expect(background).toBe(imgBackground)
    } else {
      expect(background).toBe(randomBackground)
    }
  })
})
