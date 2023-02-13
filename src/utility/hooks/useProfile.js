import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { axiosClient } from '@src/@core/services'

const useProfile = () => {

  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    try {
      const result = await axiosClient.get('/profile')
      setProfile(result)
    } catch (error) {
      toast('Action failed!', { type: 'error' })
    }
    setLoading(false)
  }
  const update = async (user) => {
    setLoading(true)
    try {
      const result = await axiosClient.patch(`/profile`, user)
      setProfile(result)
    } catch (error) {
      toast('Action failed!', { type: 'error' })
    }
    setLoading(false)
  }

  // ** Update Password
  const updatePassword = async (data) => {
    try {
      await axiosClient.patch('/change-password', data)
      toast('Successfully updated password!', { type: 'success' })
    } catch (error) {
      toast('Password was not updated successfully!', { type: 'error' })
    }
  }

  return {
    profile,
    loading,
    load,
    update,
    updatePassword,
  }
}

export default useProfile
