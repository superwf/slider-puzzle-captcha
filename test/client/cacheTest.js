import cache from '../../src/client/cache'
import expect, {createSpy} from 'expect'

describe('cache', () => {
  it('set', () => {
    expect(cache.enable).toBe(false)

    cache.set({abc: 123})

    expect(cache.abc).toBe(123)
  })
})
