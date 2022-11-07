import axios from 'axios'
import { axiosClient } from '@src/@core/services'

// ** Get data on page or row change
export const getUsers = (params) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_LOADING',
      payload: true,
    })
    const res = await axiosClient.get('/users', { params })
    dispatch({
      type: 'SET_USERS',
      payload: {
        data: res.docs,
        total: res.totalDocs,
      },
    })
  }
}

// ** Get User
export const getUser = (id) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_LOADING',
      payload: true,
    })
    const res = await axiosClient.get(`/users/${id}`)
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
      .then(() => {})
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
          payload: response,
        })
      })
      .then(() => {})
  }
}
