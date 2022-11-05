import axios from 'axios'
import {
  getUsers as getUsersApi,
  getUser as getUserApi,
} from '../axios'

// ** Get data on page or row change
export const getUsers = (params) => {
  return async (dispatch) => {
    const res = await getUsersApi(params)
    dispatch({
      type: 'SET_USERS',
      payload: {
        data: res.docs,
        total: res.totalDocs,
      }
    })
  }
}

// ** Get User
export const getUser = (id) => {
  return async (dispatch) => {
    const res = await getUserApi(id)
    dispatch({
      type: 'SET_USER',
      payload: res,
    })
  }
}

// ** Add new user
export const addUser = (user) => {
  return (dispatch) => {
    axios
      .post('/apps/users/add-user', user)
      .then((response) => {
        dispatch({
          type: 'ADD_USER',
          payload: response,
        })
      })
      .then(() => {
      })
      .catch((err) => console.log(err))
  }
}

// ** Delete user
export const deleteUser = (id) => {
  return (dispatch) => {
    axios
      .delete('/apps/users/delete', { id })
      .then((response) => {
        dispatch({
          type: 'DELETE_USER',
          payload: response
        })
      })
      .then(() => {
      })
  }
}
