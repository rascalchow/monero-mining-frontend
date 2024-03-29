import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { axiosClient } from '@src/@core/services'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useAuthCtx } from '@context/authContext'

const useGlobalData = () => {


  const { userData } = useAuthCtx();

  const dispatch = useDispatch();
  const [profileInfo, setProfileInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isInstallLoading, setInstallLoading] = useState(true)
  const [installInfo, setInstallInfo] = useState(null)
  const [installCount, setInstallCount] = useState([])
  const [liveTimeStaticLoading, setLiveTimeStaticLoading] = useState(false)
  const [liveTimeChartLoading, setLiveTimeChartLoading] = useState(false)
  const [publisherLiveTimeStatsLoading, setPublisherLiveTimeStatsLoading] = useState(true)
  const [liveTimeChartInfo, setLiveTimeChartInfo] = useState(null)
  const [liveTimeStaticInfo, setLiveTimeStaticInfo] = useState(null)
  const [publisherLiveTimeStats, setPublisherLiveTimeStats] = useState(null)
  const [appUsersInfo, setAppUsers] = useState([])
  const [publisherInstallsChartData, setPublisherInstallsChartData] = useState([])
  const [appUsersLoading, setAppUsersLoading] = useState(true)
  const [publisherInstallsLoading, setPublisherAppUsersLoading] = useState(true)
  const [users, setUsers] = useState([])
  const [isUsersLoading, setIsUsersLoading] = useState(true)
  const [status, setStatus] = useState('pending')
  const [appStatsLoading, setAppStatsLoading] = useState(false)
  const [appStatsInfo, setAppStats] = useState([])
  const [isReferralsLoading, setIsReferralsLoading] = useState(false)
  const [referrals, setReferrals] = useState([])
  const [eula, setEula] = useState(null)
  const [eulaLoading, setEulaLoading] = useState(true)
  const [eulaUpdating, setEulaUpdating] = useState(true)
  const [eulaError, setEulaError] = useState(null)
  const [isSetPrimaryUserLoading, setIsSetPrimaryUserLoading] = useState(true)


  const loadData = async (id) => {
    setLoading(true)
    try {
      const result = await axiosClient.get(`/users/${id}`)
      setProfileInfo(result)
      setStatus(result.status)
    } catch (error) {
      toast('Action failed!', { type: 'error' })
    }
    setLoading(false)
  }
  const loadInstalledUsers = async (param, id) => {
    setInstallLoading(true)
    try {
      const result = await axiosClient.get(`/app-users/installed/${id}`, {
        params: { param, type: 'installed' },
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
  const loadLiveTimeInfo = async (param, dataType, id) => {
    if (dataType == 'STATIC') setLiveTimeStaticLoading(true)
    else if (dataType == 'CHART') setLiveTimeChartLoading(true)
    try {
      const result = await axiosClient.get(`/session/livetime/${id}`, {
        params: { param, dataType },
      })
      if (dataType == 'CHART') {
        setLiveTimeChartInfo(result)
      } else if (dataType == 'STATIC') {
        setLiveTimeStaticInfo(result)
      }
    } catch (error) {
      toast('Action Failed', { type: 'error' })
    }
    setLiveTimeStaticLoading(false)
    setLiveTimeChartLoading(false)
  }
  const loadLiveTimeStats = async (param, query) => {
    setPublisherLiveTimeStatsLoading(true);
    try {
      const result = await axiosClient.get(`/session/publisher/livetime`, {
        params: { param, ...query },
      })
      setPublisherLiveTimeStats(result)
    } catch (error) {
      toast('Action Failed', { type: 'error' })
    }
    setPublisherLiveTimeStatsLoading(false);
  }
  const loadAppUsersInfo = async (params, id) => {
    setAppUsersLoading(true)
    try {
      const result = await axiosClient.get(`/app-users/${id}`, { params })
      setAppUsers(result)
    } catch (error) {
      toast('Action Failed', { type: 'error' })
    }
    setAppUsersLoading(false)
  }

  const loadPublisherInstallStats = async (params) => {
    setPublisherAppUsersLoading(true)
    try {
      const result = await axiosClient.get(`/app-users/publisher/install`, { params })
      setPublisherInstallsChartData(result)
    } catch (error) {
      toast('Action Failed', { type: 'error' })
    }
    setPublisherAppUsersLoading(false)
  }

  const publisherWithdraw = async (payoutAddress) => {
    setPublisherAppUsersLoading(true)
    let success = 'success';
    try {
      await axiosClient.post(`/payment/withdraw`, { payoutAddress })
    } catch (error) {
      const message = error.data.err
      toast(message)
      success = message;
    }
    setPublisherAppUsersLoading(false)
    return success;
  }

  const getPublisherWithdrawStatus = async () => {
    try {
      const resp = await axiosClient.get(`/payment/withdraw_status`)
      return resp.data
    } catch (error) {
      // toast('Action Failed', { type: 'error' })
      return false;
    }
  }

  const updateUser = async (user, id) => {
    setLoading(true)
    try {
      const updatedUser = await axiosClient.patch(`/users/${id}`, user)
      setProfileInfo(updatedUser)
      let newUsers = users.data
      if (newUsers.length) {
        newUsers.forEach((user, index) => {
          if (user._id == updatedUser._id) newUsers[index] = updatedUser
        })
      }
      setUsers({ ...users, data: newUsers })
      toast('Successfully updated user!', { type: 'success' })
    } catch (error) {
      toast('User update failed!', { type: 'error' })
    }
    setLoading(false)
  }

  const getUsers = async (params) => {
    setIsUsersLoading(true)
    try {
      const result = await axiosClient.get(`/users`, { params })
      const userInfo = {
        total: result.totalDocs,
        data: result.docs,
        isLoading: isUsersLoading,
      }
      setUsers(userInfo)
    } catch (error) {
      console.log(error)
      throw error
    }
    setIsUsersLoading(false)
  }

  const setUser = (user, id) => {
    setUsers({
      ...users,
      id,
      selectedUser: user,
    })
  }

  const approveUser = async (id) => {
    setLoading(true)
    try {
      const result = await axiosClient.post(`/users/${id}/approve`)
      toast('Successfully approved user!', { type: 'success' })
      setStatus('active')
    } catch (error) {
      toast('Operation unsuccessful', { type: 'error' })
    }
    setLoading(false)
  }

  const setPrimaryUser = async (id) => {
    setIsSetPrimaryUserLoading(true)
    try {
      await axiosClient.post(`/users/${id}/setPrimary`)
      toast('Successfully set master user!', { type: 'success' })
    } catch (error) {
      toast('Operation unsuccessful', { type: 'error' })
    }
    setIsSetPrimaryUserLoading(false)
  }

  const rejectUser = async (id) => {
    setLoading(true)
    try {
      const res = await axiosClient.post(`/users/${id}/reject`)
      toast('Successfully rejected user!', { type: 'success' })
      setStatus('rejected')
    } catch (error) {
      toast('Operation unsuccessful', { type: 'error' })
    }
    setLoading(false)
  }

  const loadAppStats = async (id) => {
    setAppStatsLoading(true)
    try {
      const res = await axiosClient.get('/app-users/user/stats')
      setAppStats(res)
    } catch (error) {
      toast('Cannot find application status!', { type: 'error' })
    }
    setAppStatsLoading(false)
  }

  const loadReferralsInfo = async (params, id) => {
    setIsReferralsLoading(true)
    try {
      if (userData?.role == 'admin' && id) {
        setReferrals(await axiosClient.get(`/invite/referrals/${id}`, { params }))
      } else {
        setReferrals(await axiosClient.get(`/invite/publisher/referrals`, { params }))

      }
    } catch (error) {
      toast('Cannot find referrals!', { type: 'error' })
    }
    setIsReferralsLoading(false)
  }

  const loadEula = async () => {
    setEulaLoading(true)
    try {
      if (userData?.role == 'admin') {
        setEula((await axiosClient.get(`settings/eula`)).data)
      } else {
        setEula((await axiosClient.get(`eula`)).data?.eula)
      }
      setEulaError(null);
    } catch (error) {
      setEulaError(error?.errors?.msg, "Something went wrong loading eula");
      toast('Cannot find referrals!', { type: 'error' })
    }
    setEulaLoading(false)
  }

  const updateEula = async (data) => {
    setEulaUpdating(true)
    try {
      if (userData?.role == 'admin') {
        setEula((await axiosClient.patch(`settings/eula`, { eula: data })).data)
      } else {
        setEula((await axiosClient.patch(`eula`, { eula: data })).data?.eula)
      }
    } catch (error) {
      toast('Cannot find referrals!', { type: 'error' })
    }
    setEulaUpdating(false)
  }

  const overview = {
    loading,
    profileInfo,
    loadData,
  }
  const installs = {
    installInfo,
    isInstallLoading,
    loadInstalledUsers,
    installCount,
  }
  const liveTime = {
    liveTimeStaticLoading,
    liveTimeChartLoading,
    publisherLiveTimeStatsLoading,
    loadLiveTimeInfo,
    loadLiveTimeStats,
    publisherLiveTimeStats,
    liveTimeChartInfo,
    liveTimeStaticInfo,
  }
  const appUsers = {
    appStatsLoading,
    appUsersLoading,
    publisherInstallsLoading,
    appUsersInfo,
    publisherInstallsChartData,
    loadAppUsersInfo,
    loadAppStats,
    loadPublisherInstallStats,
    publisherWithdraw,
    getPublisherWithdrawStatus,
    appStatsInfo,
  }
  const usersInfo = {
    users,
    updateUser,
    getUsers,
    setUser,
    setPrimaryUser,
    approveUser,
    rejectUser,
    isUsersLoading,
    status,
    isSetPrimaryUserLoading,
  }
  const referralsInfo = {
    referrals,
    loadReferralsInfo,
    isReferralsLoading,
  }
  const eulaInfo = {
    loading: eulaLoading,
    updating: eulaUpdating,
    error: eulaError,
    eula,
    loadEula,
    updateEula,
  }
  return {
    overview,
    installs,
    liveTime,
    appUsers,
    usersInfo,
    referralsInfo,
    eulaInfo,
  }
}

export default useGlobalData
