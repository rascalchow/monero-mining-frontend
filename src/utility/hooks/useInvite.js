import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { axiosClient } from '@src/@core/services'
import { INVITE_ERRORS } from '@const/invite'
const useInvite = () => {
  const [invitesList, setInvites] = useState([])
  const [isLoading, setLoadingState] = useState(false)
  const [isCanceled, setIsCanceled] = useState(false)
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
  const createInvite = async (data, onSubmit) => {
    setLoadingState(true)
    try {
      await axiosClient.post('/invite', data)
      onSubmit();
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

  const checkInvite = async (id) => {
    try {
      const res = await axiosClient.get(`/invite/check-code/${id}`)
      return new Promise((resolve, reject) => {
        resolve(res)
      })
    } catch (error) {
      return new Promise((resolve, reject) => {
        reject(error)
      })
    }
  }

  const cancelInvite = async (id) => {
    setIsCanceled(true)
    try {
      await axiosClient.delete(`/invite/${id}`)
      await getInvites({ page: 1, limit: 10, filter: {} })
      toast('Invitation canceled!', { type: 'success' })
    } catch (error) {
      toast('Cannot cancel the invititation!', { type: 'error' })
    }
    setIsCanceled(false)
  }

  return {
    invitesList,
    isLoading,
    isCanceled,
    getInvites,
    createInvite,
    checkInvite,
    cancelInvite,
  }
}

export default useInvite
