import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { axiosClient } from '@src/@core/services'
import { useLocation } from 'react-router-dom'

const useInvite = () => {
  const [invitesList, setInvites] = useState([])
  const [isLoading, setLoadingState] = useState(false)
  const getInvites = async (params) => {
    setLoadingState(true)
    try {
      const result = await axiosClient.get(`/invite`, { params })
      setInvites(result)
    } catch (error) {
      toast('Action failed!', { type: 'error' })
    }
    setLoadingState(false)
  }
  return {
    invitesList,
    isLoading,
    getInvites,
  }
}

export default useInvite
