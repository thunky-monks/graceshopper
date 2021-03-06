import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
export const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';
const EDITED_USER = 'EDITED_USER';

/**
 * INITIAL STATE
 */
const defaultUser = {};

/**
 * ACTION CREATORS
 */
const getUser = (user, cart) => ({ type: GET_USER, user, cart });
const removeUser = () => ({ type: REMOVE_USER });
const editedUser = user => ({ type: EDITED_USER, user });

/**
 * THUNK CREATORS
 */

export const editUser = user => async dispatch => {
  try {
    const userRes = await axios.put(`/api/users/${user.id}/`, user);
    if (userRes) dispatch(editedUser(userRes.data));
    else console.log('error udpating user profile');
  } catch (error) {
    console.log('error updating user profile');
  }
};

export const me = () => async dispatch => {
  try {
    const userRes = await axios.get('/auth/me');
    if (userRes.data) {
      const cartRes = await axios.get(`/api/users/${userRes.data.id}/cart`);
      dispatch(getUser(userRes.data || defaultUser, cartRes.data));
    }
  } catch (err) {
    console.error(err);
  }
};

export const auth = (
  firstName,
  lastName,
  email,
  password,
  method
) => async dispatch => {
  let userRes;
  try {
    userRes = await axios.post(`/auth/${method}`, {
      email,
      password,
      firstName,
      lastName
    });
  } catch (authError) {
    return dispatch(getUser({ error: authError }));
  }

  try {
    if (method === 'signup') {
      dispatch(getUser(userRes.data, []));
    } else {
      const cartRes = await axios.get(`/api/users/${userRes.data.id}/cart`);
      dispatch(getUser(userRes.data, cartRes.data));
    }
    history.push('/home');
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr);
  }
};

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout');
    dispatch(removeUser());
    history.push('/login');
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    case EDITED_USER:
      return action.user;
    default:
      return state;
  }
}
