import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { axiosClient } from '@src/@core/services'
import { INVITE_ERRORS } from '@const/invite'
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
  const createInvite = async (data) => {
    setLoadingState(true)
    try {
      await axiosClient.post('/invite', data)
      toast('Invitation Success!', { type: 'success' })
    } catch (error) {
      if (INVITE_ERRORS[error.data.errors.msg]) {
        toast(INVITE_ERRORS[error.data.errors.msg], { type: 'error' })
      } else {
        toast('Action Failed!', { type: 'error' })
      }
    }
    setLoadingState(false)
  }
  return {
    invitesList,
    isLoading,
    getInvites,
    createInvite,
  }
}

export default useInvite
