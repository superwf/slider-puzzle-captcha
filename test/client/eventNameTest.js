import eventName from '../../src/client/eventName'
import expect from 'expect'

describe('eventName', () => {
  it('eventName', () => {
    expect('start' in eventName).toBeTruthy()
    expect('move' in eventName).toBeTruthy()
    expect('end' in eventName).toBeTruthy()
  })
})
