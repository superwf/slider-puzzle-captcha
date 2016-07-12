import fetchImg from './fetchImg'
import insertImg from './insertImg'
import curry from 'lodash/curry'
import cache from '../cache'

// puzzle中加载数据与图片
export default () => {
  return fetchImg().then(curry(insertImg)(cache.root))
}
