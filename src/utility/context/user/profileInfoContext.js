import { createContext, useEffect, useContext, useState } from 'react'
import { matchPath, useLocation, useParams } from 'react-router-dom'
import useGlobalData from '@hooks/useGlobalData'
import { PROFILE_TAB_ROUTES, DURATION } from '@const/user'

export const ProfileInfoContext = createContext(null)
export const useProfileInfoCtx = () => useContext(ProfileInfoContext)
export const ProfileInfoContextProvider = ({ children }) => {
  const { id } = useParams()
  const location = useLocation()
  const { overview, installs, liveTime, appUsers, usersInfo, referralsInfo, eulaInfo } =
    useGlobalData(id)

  useEffect(() => {
    const route = PROFILE_TAB_ROUTES.find((route) => {
      return matchPath(`/publisher/${id}/${route.route}`, location.pathname)
    })
    if (route) {
      switch (route.route) {
        case '':
          overview.loadData(id)
          installs.loadInstalledUsers(DURATION, id)
          break
        case 'liveTime':
          // liveTime.loadLiveTimeInfo(DURATION, 'CHART', id)
          // liveTime.loadLiveTimeInfo(DURATION, 'STATIC', id)
          break
        case 'users':
          break
        case 'software':
          break
        case 'referral':
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
    appUsers,
    usersInfo,
    referralsInfo,
    eulaInfo,
  }
  return (
    <ProfileInfoContext.Provider value={providerValue}>
      {children}
    </ProfileInfoContext.Provider>
  )
}
