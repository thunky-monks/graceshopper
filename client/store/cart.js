import axios from 'axios'

//action types
const CHANGED_QUANTITY = 'CHANGED_QUANTITY'
const REMOVED_ITEM = 'REMOVED_ITEM'
const CHECKEDOUT = 'CHECKEDOUT'
const GOT_CART = 'GOT_CART'

//action creators
const changedQuantity = (quantity, productId) => ({
  type: CHANGED_QUANTITY,
  quantity,
  productId
})

const gotCart = cart => ({
  type: GOT_CART,
  cart
})

//thunks
export const changeQuantity = (quantity, productId) => async dispatch => {
  try {
    const {data} = await axios.put('/api/carts/edit', {quantity, productId})
    console.log(data)
    dispatch(changedQuantity(data.quantity, data.productId))
  } catch (error) {
    console.log('error changing quantity', error)
  }
}

export const getCart = () => async dispatch => {
  try {
    console.log('we are in the getCart thunk')
    const {data} = await axios.get('/api/carts')
    console.log('we got the data')
    dispatch(gotCart(data))
  } catch (error) {
    console.log('error getting cart', error)
  }
}

//initialState
const initialState = {}

//reducer
export default function(state = {}, action) {
  switch (action.type) {
    case CHANGED_QUANTITY:
      return {...state, [action.productId]: action.quantity}
    case GOT_CART:
      return action.cart.reduce((prev, curr) => {
        prev[curr.productId] = curr.quantity
        return prev
      }, {})
    default:
      return state
  }
}
