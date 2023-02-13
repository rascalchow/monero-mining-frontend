import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { axiosClient } from '@src/@core/services'

const useProduct = () => {
  const [productData, setProductData] = useState(null)
  const [isLoading, setLoadingState] = useState(false)

  const load = async () => {
    setLoadingState(true)
    try {
      const res = await axiosClient.get('/product')
      setProductData(res)
    } catch (error) {
      toast('Action failed!', { type: 'error' })
    }
    setLoadingState(false)
  }

  const update = async (data) => {
    setLoadingState(true)
    try {
      const res = await axiosClient.post('/product', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setProductData(res)
      toast('Successfully updated product information!', { type: 'success' })
    } catch (error) {
      toast('Product information was not updated successfully!', {
        type: 'error',
      })
    }
    setLoadingState(false)
  }
  return {
    productData,
    isLoading,
    load,
    update,
  }
}

export default useProduct
