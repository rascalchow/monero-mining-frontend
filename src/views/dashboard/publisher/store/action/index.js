import { axiosClient } from '@src/@core/services'

export const getAppStats = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'DASHBOARD/PUBLISHER/SET_APP_STATS',
        payload: {
          isLoading: true,
          error: null,
        },
      })
      const res = await axiosClient.get('/app-users/stats')
      dispatch({
        type: 'DASHBOARD/PUBLISHER/SET_APP_STATS',
        payload: {
          data: res.data,
          isLoading: false,
          error: null,
        },
      })
    } catch (error) {
      dispatch({
        type: 'DASHBOARD/PUBLISHER/SET_APP_STATS',
        payload: {
          isLoading: false,
          error: error.message,
        },
      })
    }
  }
}

export const getDeviceList = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'DASHBOARD/PUBLISHER/SET_DEVICE_LIST',
        payload: {
          isLoading: true,
          error: null,
        },
      })
      const res = await axiosClient.get('/app-users')

      dispatch({
        type: 'DASHBOARD/PUBLISHER/SET_DEVICE_LIST',
        payload: {
          data: res.data,
          isLoading: false,
          error: null,
        },
      })
    } catch (error) {
      dispatch({
        type: 'DASHBOARD/PUBLISHER/SET_DEVICE_LIST',
        payload: {
          isLoading: false,
          error: error.message,
        },
      })
    }
  }
}
