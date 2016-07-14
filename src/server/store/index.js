/*
 * 所有store类型需要实现五个方法
 * get set keys remove clear
 * */
import config from '../../config'
import redisStore from './redis'
import memoryStore from './memory'

let store = config.store === 'redis' ? redisStore() : memoryStore
export default store
