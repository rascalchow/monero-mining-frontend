import { axiosClient } from '@src/@core/services'

// ** Get eula template
export const updatePassword = (data) => {
  return async () => {
    await axiosClient.patch('/change-password', data)
  }
}

export const getProfile = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'ACCOUNT_SETTINGS/SET_PROFILE',
        payload: {
          isLoading: true,
          error: null,
        },
      })
      const res = await axiosClient.get('/profile')

      dispatch({
        type: 'ACCOUNT_SETTINGS/SET_PROFILE',
        payload: {
          ...res,
          isLoading: false,
          error: null,
        },
      })
    } catch (error) {
      dispatch({
        type: 'ACCOUNT_SETTINGS/SET_PROFILE',
        payload: {
          isLoading: false,
          error: error,
        },
      })
    }
  }
}
