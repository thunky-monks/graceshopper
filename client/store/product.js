import axios from 'axios'
import history from '../history'
import {runInNewContext} from 'vm'

/**
 * ACTION TYPES
 */
const GOT_ALL_PRODUCTS = 'GOT_ALL_PRODUCTS'
const GOT_SINGLE_PRODUCT = 'GOT_SINGLE_PRODUCT'

/**
 * ACTION CREATORS
 */
const gotAllProducts = products => ({type: GOT_ALL_PRODUCTS, products})
const gotSingleProduct = products => ({type: GOT_SINGLE_PRODUCT, products})

/**
 * THUNK CREATORS
 */
export const getAllProducts = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/products')
    dispatch(gotAllProducts(data))
  } catch (err) {
    console.error(err)
  }
}

export const getSingleProducts = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/products/${id}`)
    dispatch(gotSingleProduct(data))
  } catch (err) {
    console.log(err)
  }
}

/**
 * INITIAL STATE
 */
const initialState = {products: [], singleProduct: {}}

/**
 * REDUCER
 */

export default (state = initialState, action) => {
  switch (action.type) {
    case GOT_ALL_PRODUCTS:
      return {...state, products: [...action.products]}
    case GOT_SINGLE_PRODUCT:
      return {...state, singleProduct: {...action.products}}
    default:
      return state
  }
}
