import axios from 'axios'
import { axiosClient } from '@src/@core/services'

// ** Get data on page or row change
export const getUsers = (params) => {
  return async (dispatch) => {
    try {
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
    } catch (error) {
      dispatch({
        type: 'SET_LOADING',
        payload: false,
      })
      throw error
    }
  }
}

// ** Get User
export const getUser = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'SET_LOADING',
        payload: true,
      })
      const res = await axiosClient.get(`/users/${id}`)
      dispatch({
        type: 'SET_USER',
        payload: res,
      })
    } catch (error) {
      dispatch({
        type: 'SET_LOADING',
        payload: false,
      })
      dispatch({
        type: 'SET_USER',
        payload: null,
      })
      throw error
    }
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

// **Approve user
export const approveUser = (id) => async (dispatch) => {
  const res = await axiosClient.post(`/users/${id}/approve`)
  dispatch({
    type: 'SET_USER_STATUS',
    payload: res,
  })
  return res
}

export const rejectUser = (id) => async (dispatch) => {
  const res = await axiosClient.post(`/users/${id}/reject`)
  dispatch({
    type: 'SET_USER_STATUS',
    payload: res,
  })
  return res
}
