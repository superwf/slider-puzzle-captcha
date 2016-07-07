import store from '../../../src/lib/store/memory'
import testStore from './testStore'

describe('memory store', testStore(store))
