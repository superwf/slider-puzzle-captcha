import createStore from '../../../src/server/store/redis'
import testStore from './testStore'

describe('redis store', testStore(createStore()))
