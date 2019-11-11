import axios from 'axios'
import {GET_USER} from './user'

//action types
const CHANGED_QUANTITY = 'CHANGED_QUANTITY'
const REMOVED_ITEM = 'REMOVED_ITEM'
const GOT_CART = 'GOT_CART'
const ADD_ITEM = 'ADD_ITEM'

//action creators
const addedItem = (quantity, productId) => ({
  type: ADD_ITEM,
  quantity,
  productId
})

const changedQuantity = (quantity, productId) => ({
  type: CHANGED_QUANTITY,
  quantity,
  productId
})

const gotCart = cart => ({
  type: GOT_CART,
  cart
})

const removedItem = productId => ({
  type: REMOVED_ITEM,
  productId
})

// const checkedOut = () => ({
//   type: CHECKEDOUT
// })

//thunks
export const addItem = (quantity, productId) => async dispatch => {
  try {
    const {data} = await axios.post('/api/carts/add', {quantity, productId})
    dispatch(addedItem(data.quantity, data.productId))
  } catch (error) {
    console.log('error adding item', error)
  }
}

export const changeQuantity = (quantity, productId) => async dispatch => {
  try {
    const {data} = await axios.put('/api/carts/edit', {quantity, productId})
    dispatch(changedQuantity(data.quantity, data.productId))
  } catch (error) {
    console.log('error changing quantity', error)
  }
}

export const getCart = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/users/${userId}/cart`)
    console.log(data)
    dispatch(gotCart(data))
  } catch (error) {
    console.log('error getting cart', error)
  }
}

export const removeItem = productId => async dispatch => {
  try {
    await axios.delete(`/api/carts/delete/${productId}`)
    dispatch(removedItem(productId))
  } catch (error) {
    console.log('error removing item from cart')
  }
}

export const checkout = cart => async dispatch => {
  try {
    await axios.post('/api/carts/checkout', {cart})
    dispatch(gotCart([]))
  } catch (error) {
    console.log('error checking out')
  }
}

//initialState
const initialState = {}

//reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_ITEM:
      return {...state, [action.productId]: action.quantity}
    case CHANGED_QUANTITY:
      return {...state, [action.productId]: action.quantity}
    case GET_USER:
      console.log(action.cart)
      return action.cart.reduce((prev, curr) => {
        prev[curr.productId] = curr.quantity
        return prev
      }, {})
    case GOT_CART:
      return action.cart.reduce((prev, curr) => {
        prev[curr.productId] = curr.quantity
        return prev
      }, {})
    case REMOVED_ITEM:
      let newState = {...state}
      delete newState[action.productId]
      return newState
    default:
      return state
  }
}
