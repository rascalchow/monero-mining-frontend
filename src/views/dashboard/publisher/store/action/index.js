import { axiosClient } from '@src/@core/services'

export const getAppStats = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'SET_LOADING',
        payload: true,
      })
      const res = await axiosClient.get('/app-users/stats')
      dispatch({
        type: 'DASHBOARD/PUBLISHER/SET_APP_STATS/',
        payload: {
          data: res.data,
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
