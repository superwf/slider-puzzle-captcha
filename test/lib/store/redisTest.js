import createStore from '../../../src/lib/store/redis'
import testStore from './testStore'

describe('redis store', testStore(createStore()))
