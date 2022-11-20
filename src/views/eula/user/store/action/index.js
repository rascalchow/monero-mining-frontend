import { axiosClient } from '@src/@core/services'

// ** Get eula template
export const getEula = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'EULA/USER/SET',
        payload: {
          data: null,
          isLoading: true,
          isUpdating: false,
          error: null,
        },
      })
      const res = await axiosClient.get('/eula')

      dispatch({
        type: 'EULA/USER/SET',
        payload: {
          data: res.data,
          isLoading: false,
          isUpdating: false,
          error: null,
        },
      })
    } catch (error) {
      dispatch({
        type: 'EULA/USER/SET',
        payload: {
          isLoading: false,
          isUpdating: false,
          error: error,
        },
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
        type: 'EULA/USER/SET',
        payload: {
          isLoading: false,
          isUpdating: true,
          error: null,
        },
      })
      const res = await axiosClient.patch('/eula', { eula: data })
      dispatch({
        type: 'EULA/USER/SET',
        payload: {
          data: res.data,
          isLoading: false,
          isUpdating: false,
          error: null,
        },
      })
    } catch (error) {
      dispatch({
        type: 'SET_UPDATING',
        payload: {
          isLoading: false,
          isUpdating: false,
          error: error,
        },
      })
      throw error
    }
  }
}
