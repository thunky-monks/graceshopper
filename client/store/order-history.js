import axios from 'axios'

//action types
const GOT_ORDER_HISTORY = 'GOT_ORDER_HISTORY'

//action creators
export const gotOrderHistory = orderHistory => ({
  type: GOT_ORDER_HISTORY,
  orderHistory
})

//thunks
export const getOrderHistory = userId => async dispatch => {
  try {
    console.log('HITTING THE ROUTE!')
    const {data} = await axios.get(`/api/users/${userId}/history`)
    console.log('DID IT, HIT THE ROUTE')
    dispatch(gotOrderHistory(data))
  } catch (error) {
    console.log('error getting order history', error)
  }
}

//initialState
const initialState = []

//reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_ORDER_HISTORY:
      return action.orderHistory
    default:
      return state
  }
}
