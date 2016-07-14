import store from '../../../src/server/store/memory'
import testStore from './testStore'

describe('memory store', testStore(store))
