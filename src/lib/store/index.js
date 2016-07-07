/*
 * 所有store类型需要实现五个方法
 * get set keys remove clear
 * */
import {isProduction} from '../util/env'
import redisStore from './redis'
import memoryStore from './memory'

let store = isProduction ? redisStore() : memoryStore
export default store
