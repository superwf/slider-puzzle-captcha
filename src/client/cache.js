import assign from 'lodash/assign'

// 存储各个元素，当重新获取验证信息时更新该对象
const cache = {
  enable: false
}

const set = obj => {
  assign(cache, obj)
}
cache.set = set

// clear all cache
// only use in test
cache.clear = () => {
  const keys = Object.keys(cache)
  for (let i = 0, l = keys.length; i < l; i++) {
    let key = keys[i]
    if (key === 'set' || key === 'clear') {
      continue
    }
    delete cache[key]
  }
  cache.enable = false
}

export default cache
