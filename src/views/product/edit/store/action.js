import { toast } from 'react-toastify'
import { axiosClient } from '../../../../@core/services'

export const get = () => async (dispatch) => {
  try {
    dispatch({
      type: 'PRODUCT/EDIT/SET',
      payload: {
        isLoading: true,
        isUpdating: false,
        error: null,
      },
    })
    const res = await axiosClient.get('/product')
    dispatch({
      type: 'PRODUCT/EDIT/SET',
      payload: {
        data: res.data,
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

export const update = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: 'PRODUCT/EDIT/SET',
      payload: {
        isLoading: false,
        isUpdating: true,
        error: null,
      },
    })
    const res = await axiosClient.post('/product', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    dispatch({
      type: 'PRODUCT/EDIT/SET',
      payload: {
        data: res.data,
        isLoading: false,
        isUpdating: false,
        error: null,
      },
    })
    toast('Successfully updated product information!', { type: 'success' })
  } catch (error) {
    dispatch({
      type: 'PRODUCT/EDIT/SET',
      payload: {
        isLoading: false,
        isUpdating: false,
        error: error,
      },
    })
    toast('Product information was not updated successfully!', {
      type: 'error',
    })
  }
}
