import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GOT_ALL_PRODUCTS = 'GOT_ALL_PRODUCTS'

/**
 * ACTION CREATORS
 */
const gotAllProducts = products => ({type: GOT_ALL_PRODUCTS, products})

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

/**
 * INITIAL STATE
 */
const products = []

/**
 * REDUCER
 */
export default function(state = products, action) {
  switch (action.type) {
    case GOT_ALL_PRODUCTS:
      return action.products
    default:
      return state
  }
}
