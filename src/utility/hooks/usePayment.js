import { useState } from 'react'
import { axiosClient } from '@src/@core/services'
import { toast } from 'react-toastify'


const usePayment = () => {
  const [availableCurrencies, setAvailableCurrencies] = useState([]);
  const [loadingAvailableCurrencies, setLoadingAvailableCurrencies] = useState(true)

  // ** Load Payment Currencies
  const loadAvailableCurrencies = async () => {
    setLoadingAvailableCurrencies(true)
    setAvailableCurrencies([])
    try {
      const result = await axiosClient.get(`/payment/currencies`)
      if (result.success)
        setAvailableCurrencies(result.data)
    } catch (error) {
      toast('Action failed!', { type: 'error' })
    }
    setLoadingAvailableCurrencies(false)
  }

  return {
    availableCurrencies,
    loadingAvailableCurrencies,
    loadAvailableCurrencies
  }
}

export default usePayment
