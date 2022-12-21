import { Calendar } from 'react-feather'
import { formatDateAlt } from '@utils'

export const PUBLISHER_SORT_KEY = [
  'name',
  'email',
  'companyName',
  'status',
  'installs',
  'live',
  'liveTime',
  'earnings',
  'referrals',
  'payments',
]
export const APP_USER_SORT_KEY = [
  'userKey',
  'device',
  'operatingSystem',
  'liveTime',
  'timeRatio',
  'earned',
  'spent',
  'log',
  'installedAt',
  'uninstalledAt'
]
export const REFERRALS_SORT_KEY = [
  'companyName',
  'stat',
  'commissions',
  'referrals',
  'referralCommissions'
]
export const PROFILE_TAB_ROUTES = [
  {
    id: '1',
    title: 'Overview',
    route: '',
  },
  {
    id: '2',
    title: 'Software White Label',
    route: 'software',
  },
  {
    id: '3',
    title: 'Live Time',
    route: 'liveTime',
  },
  {
    id: '4',
    title: 'App Users',
    route: 'users',
  },
  {
    id: '5',
    title: 'Referrals',
    route: 'referral'
  }
]

export const DURATION = [
  (new Date(Date.now() - 86400000 * 7)).toISOString(),
  (new Date()).toISOString()
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
  }
]

export const RESTRICTED_APP_USER_COLUMN = [
  'device',
  'operatingSystem',
  'installedAt',
  'uninstalledAt',
  'status',
]
