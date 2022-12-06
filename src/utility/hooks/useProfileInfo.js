import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { axiosClient } from '@src/@core/services'
import { useLocation } from 'react-router-dom'
import {
  DURATION,
  PROFILE_TAB_ROUTES,
} from '@const/user'
import axios from 'axios'
const useProfileInfo = (id) => {
  const [profileInfo, setProfileInfo] = useState(null)
  const [loading, setLoading] = useState(false)
  const [isInstallLoading, setInstallLoading] = useState(false)
  const [installInfo, setInstallInfo] = useState(null)
  const [installCount, setInstallCount] = useState([])
  const [liveTimeStaticLoading, setLiveTimeStaticLoading] = useState(false)
  const [liveTimeChartLoading, setLiveTimeChartLoading] = useState(false)
  const [liveTimeChartInfo, setLiveTimeChartInfo] = useState(null)
  const [liveTimeStaticInfo, setLiveTimeStaticInfo] = useState(null)
  const [appUsersInfo, setAppUsers] = useState([])
  const [appUsersLoading, setAppUsersLoading] = useState(false)
  const location = useLocation()

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
  const loadInstallInfo = async (param) => {
    setInstallLoading(true)
    try {
      const result = await axiosClient.get(`/users/appUserInfo/${id}`, {
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
  const loadLiveTimeInfo = async (param, dataType) => {
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
  const loadAppUsersInfo = async(params)=>{
    setAppUsersLoading(true)
    try{
      const result = await axiosClient.get(`/app-users/${id}`, {params})
      setAppUsers(result)
    }catch(error){
      toast('Action Failed', { type: 'error' })
    }
    setAppUsersLoading(false)
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
  const liveTime = {
    liveTimeStaticLoading,
    liveTimeChartLoading,
    loadLiveTimeInfo,
    liveTimeChartInfo,
    liveTimeStaticInfo,
  }
  const appUsers={
    appUsersLoading,
    appUsersInfo,
    loadAppUsersInfo
  }
  return {
    overview,
    installs,
    liveTime,
    appUsers
  }
}

export default useProfileInfo
