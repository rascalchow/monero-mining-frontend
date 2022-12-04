import { createContext, useEffect, useContext } from 'react'
import { matchPath, useLocation, useParams } from 'react-router-dom'
import useProfileInfo from '@hooks/useProfileInfo'
export const PROFILE_TAB_ROUTES = [
  {
    title: 'Overview',
    route: 'overview',
  },
  {
    title: 'Software White Label',
    route: 'software',
  },
  {
    title: 'Live Time',
    route: 'liveTime',
  },
  {
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
  {
    name: 'Last 7 Days',
    type: 'day',
    value: 7,
  },
  {
    name: 'Last Month',
    type: 'month',
    value: 1,
  },
  {
    name: 'Last 3 Months',
    type: 'month',
    value: 3,
  },
]
export const ProfileInfoContext = createContext(null)
export const useProfileInfoCtx = () => useContext(ProfileInfoContext)
export const ProfileInfoContextProvider = ({ children }) => {
  const { id } = useParams()
  const location = useLocation()

  const { overview, installs } = useProfileInfo(id)

  useEffect(() => {
    const route = PROFILE_TAB_ROUTES.find((route) => {
      return matchPath(`/publisher/${id}/${route.route}`, location.pathname)
    })
    if (route) {
      switch (route.id) {
        case 'overview':
          overview.loadData()
          installs.loadInstallInfo(DURATION[0])
          break
        case 'software':
          break
        default:
          break
      }
    }
  }, [])
  const providerValue = {
    overview,
    installs,
  }
  return (
    <ProfileInfoContext.Provider value={providerValue}>
      {children}
    </ProfileInfoContext.Provider>
  )
}
