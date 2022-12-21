// ** React Imports
import { Link } from 'react-router-dom'
// ** Third Party Components
import _ from 'lodash'
//
import { UncontrolledTooltip } from 'reactstrap'
import { formatDate } from '@utils'
import { Badge } from 'reactstrap'
import { secondsToHMS } from '@utils'
const BADGE_COLOR = {
  installed: 'light-info',
  uninstalled: 'light-warning',
}

export const columns = [
  {
    name: 'User Key',
    selector: 'userKey',
    sortable: true,
    cell: (row) => row.userKey,
  },
  {
    name: 'Device',
    selector: 'device',
    sortable: true,
    cell: (row) => row.device,
  },
  {
    name: 'Operating System',
    selector: 'operatingSystem',
    sortable: true,
    cell: (row) => row.operatingSystem,
  },
  {
    name: 'Live Time(SEC)',
    selector: 'liveTime',
    sortable: true,
    cell: (row) => (
      <>
        <div id={'tooltip' + row._id}>
          {row.liveTime ? `${row.liveTime}  secs` : ''}
        </div>
        {row.liveTime && (
          <UncontrolledTooltip placement="top" target={'tooltip' + row._id}>
            {secondsToHMS(row.liveTime)}
          </UncontrolledTooltip>
        )}
      </>
    ),
  },
  {
    name: 'Time Ratio (%)',
    selector: 'timeRatio',
    sortable: true,
    cell: (row) => row.timeRatio,
  },
  {
    name: 'Currency Earned',
    selector: 'currencyEarned',
    sortable: true,
    cell: (row) => row.currencyEarned,
  },
  {
    name: 'Currency Spent',
    selector: 'currencySpent',
    sortable: true,
    cell: (row) => row.currencySpent,
  },
  {
    name: 'Status',
    selector: 'status',
    sortable: true,
    cell: (row) => (
      <Badge
        className="text-capitalize "
        color={BADGE_COLOR[row.status] ? BADGE_COLOR[row.status] : ''}
        pill
      >
        {row.status}
      </Badge>
    ),
  },
  {
    name: 'Spend Log',
    selector: 'spendLog',
    sortable: true,
    cell: (row) => <Link to={`/spendLog/${row._id}`}>{row.spendLog}</Link>,
  },
  {
    name: 'Installed At',
    selector: 'installedAt',
    sortable: true,
    cell: (row) => formatDate(row.installedAt),
  },
  {
    name: 'Uninstalled At',
    selector: 'uninstalledAt',
    sortable: true,
    cell: (row) => formatDate(row.uninstalledAt),
  },
]

/////////////////////REFERRALS///////////////////

const REFERRAL_BADGE_COLOR = {
  active: 'light-info',
  pending: 'light-warning',
  rejected: 'light-danger',
}

export const referralsColumn = [
  {
    name: 'Company Name',
    selector: 'companyName',
    sortable: true,
    cell: (row) => row.companyName,
  },
  {
    name: 'Status',
    selector: 'stat',
    sortable: true,
    cell: (row) => (
      <Badge
        className="text-capitalize "
        color={
          REFERRAL_BADGE_COLOR[row.status]
            ? REFERRAL_BADGE_COLOR[row.status]
            : ''
        }
        pill
      >
        {row.status}
      </Badge>
    ),
  },
  {
    name: 'Referrals',
    selector: 'referrals',
    sortable: true,
    cell: (row) => row.referrals,
  },
  {
    name: 'Commissions',
    cell: (row) => '0',
  },
  {
    name: 'Referral Commissions',
    cell: (row) => '0',
  },
]
