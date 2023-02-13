import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { axiosClient } from '@src/@core/services'

const useUser = () => {
  const [users, setUsers] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)
  const [isLoading, setLoadingState] = useState(false)

  const getUser = async (id) => {
    setLoadingState(true)
    try {
      const result = await axiosClient.get(`/users/${id}`)
      setSelectedUser(result)
    } catch (error) {
      toast('Action failed!', { type: 'error' })
    }
    setLoadingState(false)
  }
  return {
    users,
    selectedUser,
    isLoading,
    getUser,
  }
}

export default useUser
