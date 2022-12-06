import { createContext, useEffect, useContext, useState } from 'react'
import { matchPath, useLocation, useParams } from 'react-router-dom'
import { Calendar } from 'react-feather'
import useProfileInfo from '@hooks/useProfileInfo'
import { formatDateAlt } from '../../../../utility/Utils'
export const PROFILE_TAB_ROUTES = [
  {
    id:'1',
    title: 'Overview',
    route: '',
  },
  {
    id:'2',
    title: 'Software White Label',
    route: 'software',
  },
  {
    id:'3',
    title: 'Live Time',
    route: 'liveTime',
  },
  {
    id:'4',
    title: 'Users',
    route: 'users',
  },
]
export const PROFILE_TYPES = [
  {
    name: 'general',
    url: 'users',
    params: {
      role: 'publisher',
    },
  },
  {
    name: 'installed',
    url: 'install',
    params: {
      duration: -1,
    },
  },
]
export const DURATION = [
  formatDateAlt(new Date(Date.now() - 86400000 * 7)),
  formatDateAlt(new Date()),
]
export const LIVETIME = [
  {
    name: "Today's Live Time",
    color: 'primary',
    type: 'daily',
    icon: <Calendar size={21} />,
  },
  {
    name: '30 Days Live Time',
    iconColor: 'warning',
    type: 'monthly',
    icon: <Calendar size={21} />,
  },
  {
    name: 'Total Live Time',
    iconColor: 'success',
    type: 'all',
    icon: <Calendar size={21} />,
  },
]
export const ProfileInfoContext = createContext(null)
export const useProfileInfoCtx = () => useContext(ProfileInfoContext)
export const ProfileInfoContextProvider = ({ children }) => {
  const { id } = useParams()
  const location = useLocation()
  const { overview, installs, liveTime } = useProfileInfo(id)

  useEffect(() => {
    const route = PROFILE_TAB_ROUTES.find((route) => {
      return matchPath(`/publisher/${id}/${route.route}`, location.pathname)
    })
    if (route) {
      switch (route.route) {
        case '':
          overview.loadData()
          installs.loadInstallInfo(DURATION)
          break
        case 'liveTime':
          liveTime.loadLiveTimeInfo(DURATION, 'CHART')
          liveTime.loadLiveTimeInfo(DURATION, 'STATIC')
          break
        case 'software':
          break
        default:
          break
      }
    }
  }, [location])
  const providerValue = {
    overview,
    installs,
    liveTime,
  }
  return (
    <ProfileInfoContext.Provider value={providerValue}>
      {children}
    </ProfileInfoContext.Provider>
  )
}
