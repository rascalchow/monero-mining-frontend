// ** React Imports
import { Link } from 'react-router-dom'
// ** Store & Actions

// ** Third Party Components
import _ from 'lodash'

export const columns = [
  {
    name: 'User Key',
    width: '12%',
    selector: 'userKey',
    sortable: true,
    cell: (row) => row.userKey,
  },
  {
    name: 'Device',
    width: '12%',
    selector: 'device',
    sortable: true,
    cell: (row) => row.device,
  },
  {
    name: 'Operating System',
    width: '16%',
    selector: 'operatingSystem',
    sortable: true,
    cell: (row) => row.operatingSystem,
  },
  {
    name: 'Live Time',
    width: '12%',
    selector: 'liveTime',
    sortable: true,
    cell: (row) => row.liveTime,
  },
  {
    name: 'Time Ratio',
    width: '12%',
    selector: 'timeRatio',
    sortable: true,
    cell: (row) => row.timeRatio,
  },
  {
    name: 'Currency Earned',
    width: '12%',
    selector: 'currencyEarned',
    sortable: true,
    cell: (row) => row.currencyEarned,
  },
  {
    name: 'Currency Spent',
    width: '12%',
    selector: 'currencySpent',
    sortable: true,
    cell: (row) => row.currencySpent,
  },
  {
    name: 'Spend Log',
    width: '12%',
    selector: 'spendLog',
    sortable: true,
    cell: (row) => row?.spendLog,
  },
]
