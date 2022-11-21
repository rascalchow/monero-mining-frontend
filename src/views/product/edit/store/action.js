import { axiosClient } from '@src/@core/services'

export const getProductInfo = () => async (dispatch) => {
  try {
    dispatch({
      type: 'PRODUCT/EDIT/SET',
      payload: {
        isLoading: true,
        isUpdating: false,
        error: null,
      },
    })
    const res = await axiosClient.get('/profile')
    dispatch({
      type: 'PRODUCT/EDIT/SET',
      payload: {
        data: res,
        isLoading: false,
        isUpdating: false,
        error: null,
      },
    })
  } catch (error) {
    dispatch({
      type: 'PRODUCT/EDIT/SET',
      payload: {
        isLoading: false,
        isUpdating: false,
        error: error,
      },
    })
  }
}
