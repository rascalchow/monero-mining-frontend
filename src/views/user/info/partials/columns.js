// ** React Imports
import { Link } from 'react-router-dom'
// ** Third Party Components
import _ from 'lodash'
//
import { formatDate } from '@utils'
import { Badge } from 'reactstrap'
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
    name: 'Live Time',
    selector: 'liveTime',
    sortable: true,
    cell: (row) => row.liveTime,
  },
  {
    name: 'Time Ratio',
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
    )
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
