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
          ...res.data,
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
