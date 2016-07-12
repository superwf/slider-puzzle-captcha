import generateToken from '../../../src/lib/util/generateToken'
import expect from 'expect'

describe('generate token', () => {

  it('token is string', () => {
    let token = generateToken()
    expect(typeof token).toBe('string')
    expect(/[\d\w]/.test(token)).toBeTruthy()
  })
})
