import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { axiosClient } from '@src/@core/services'
import { useLocation } from 'react-router-dom'
import { DURATION } from '../../views/user/info/partials/profileInfoContext'
import axios from 'axios'
const useProfileInfo = (id) => {
  const [profileInfo, setProfileInfo] = useState(null)
  const [loading, setLoading] = useState(false)
  const [isInstallLoading, setInstallLoading] = useState(false)
  const [installInfo, setInstallInfo] = useState(null)
  const [installCount, setInstallCount] = useState([])
  const location = useLocation()

  useEffect(() => {
    loadData()
    loadInstallInfo(DURATION[0])
  }, [location])

  const loadData = async () => {
    setLoading(true)
    try {
      const result = await axiosClient.get(`/users/${id}`)
      setProfileInfo(result)
    } catch (error) {
      toast('Action failed!', { type: 'error' })
    }
    setLoading(false)
  }
  const loadInstallInfo = async (item) => {
    // const duration = handleDuration(item)
    setInstallLoading(true)
    try {
      const result = await axiosClient.get(`/users/installs/${id}`, {
        params: { item },
      })
      setInstallInfo(result.info)
      setInstallCount([
        {
          name: 'Installs',
          data: result.count,
        },
      ])
    } catch (error) {
      toast('Action Failed', { type: 'error' })
    }
    setInstallLoading(false)
  }
  const overview = {
    loading,
    profileInfo,
    loadData,
  }
  const installs = {
    installInfo,
    isInstallLoading,
    loadInstallInfo,
    installCount,
  }
  return {
    overview,
    installs,
  }
}

export default useProfileInfo
