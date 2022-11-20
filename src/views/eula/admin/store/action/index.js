import { axiosClient } from '@src/@core/services'

// ** Get eula template
export const getEula = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'SET_LOADING',
        payload: true,
      })
      const res = await axiosClient.get('/settings/eula')
      dispatch({
        type: 'SET_EULA',
        payload: res.data,
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

// ** Update eula template
export const updateEula = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'SET_UPDATING',
        payload: true,
      })
      const res = await axiosClient.patch('/settings/eula', { eula: data })
      dispatch({
        type: 'SET_EULA',
        payload: res.data,
      })
    } catch (error) {
      dispatch({
        type: 'SET_UPDATING',
        payload: false,
      })
      throw error
    }
  }
}
