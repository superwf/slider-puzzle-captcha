import allowIp from '../../src/server/allowIp'
import expect from 'expect'
import config from '../../src/config'

describe('allowIp', () => {
  it('allow or not', () => {
    expect(allowIp(config.allowedIps[0])).toBe(true)
    expect(allowIp('127.0.0.3')).toBe(false)
  })
})
