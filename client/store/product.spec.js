import {expect} from 'chai'
import {getAllProducts} from './product'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {products: []}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('getAllProducts', () => {
    it('eventually dispatches the GOT ALL PRODUCTS action', async () => {
      const fakeProduct = {products: 'Cody'}
      mockAxios.onGet('/api/products').replyOnce(200, fakeProduct)
      await store.dispatch(getAllProducts())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GOT_ALL_PRODUCTS')
      expect(actions[0].products).to.be.deep.equal(fakeProduct)
    })
  })
})
