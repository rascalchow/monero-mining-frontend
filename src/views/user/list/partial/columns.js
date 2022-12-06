import { useContext } from 'react'
// ** React Imports
import { Link } from 'react-router-dom'

import { useSearchParams } from '@src/navigation'
// ** Store & Actions
import { setUser, deleteUser } from '../../store/action'
import { store } from '@store/storeConfig/store'
import { SidebarCtx } from '@context/user/sidebarContext'

// ** Third Party Components
import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap'
import {
  Edit2,
  MoreVertical,
  FileText,
  Trash2,
  Archive,
  UserCheck,
  UserX,
} from 'react-feather'
import _ from 'lodash'

const renderRole = (row) => {
  const roleObj = {
    publisher: {
      class: 'text-primary',
      icon: UserX,
    },
    admin: {
      class: 'text-success',
      icon: UserCheck,
    },
  }

  const Icon = roleObj[row.role] ? roleObj[row.role].icon : Edit2

  return (
    <span className="text-truncate text-capitalize align-middle">
      <Icon
        size={18}
        className={`${roleObj[row.role] ? roleObj[row.role].class : ''} mr-50`}
      />
      {row.role}
    </span>
  )
}

const statusObj = {
  pending: 'light-warning',
  active: 'light-success',
  inactive: 'light-secondary',
}

export const columns = [
  {
    name: 'Name',
    width: '12%',
    selector: 'name',
    sortable: true,
    cell: (row) => <Link to={`/publisher/${row._id}`}>{row['name']}</Link>,
  },
  {
    name: 'Email',
    width: '12%',
    selector: 'email',
    sortable: true,
    cell: (row) => row.email,
  },
  {
    name: 'Company',
    width: '11%',
    selector: 'companyName',
    sortable: true,
    cell: (row) => row.companyName,
  },
  {
    name: 'Installs',
    width:'8%',
    selector: 'installs',
    sortable: true,
    cell: (row) => row.installs
  },
  {
    name: 'Live',
    width:'7%',
    selector: 'live',
    sortable: true,
    cell: (row) => row.live
  },
  {
    name: 'Live Time',
    width:'7%',
    selector: 'liveTime',
    sortable: true,
    cell: (row) => row.liveTime
  },
  {
    name: 'Success Rate',
    width:'7%',
    selector: 'successRate',
    sortable: true,
    cell: (row) => 1
  },
  {
    name: 'Earnings',
    width:'7%',
    selector: 'earnings',
    sortable: true,
    cell: (row) => row.earnings
  },
  {
    name: 'Referrals',
    width:'7%',
    selector: 'referrals',
    sortable: true,
    cell: (row) => row.referrals
  },
  {
    name: 'Payments',
    width:'7%',
    selector: 'payments',
    sortable: true,
    cell: (row) => row.payments
  },
  {
    name: 'Status',
    width: '9%',
    sortable: true,
    selector: 'status',
    cell: (row) => (
      <Badge className="text-capitalize" color={statusObj[row.status]} pill>
        {row.status}
      </Badge>
    ),
  },
  {
    name: 'Actions',
    width: '6%',
    cell: (row) => {
      const { setSidebarOpen, setToCreateMode } = useContext(SidebarCtx)
      return (
        <UncontrolledDropdown>
          <DropdownToggle tag="div" className="btn btn-sm">
            <MoreVertical size={14} className="cursor-pointer" />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem
              tag={Link}
              to={`/user/view/${row._id}`}
              className="w-100"
            >
              <FileText size={14} className="mr-50" />
              <span className="align-middle">Details</span>
            </DropdownItem>
            <DropdownItem
              // to={`/apps/user/edit/${row._id}`}
              className="w-100"
              onClick={() => {
                store.dispatch(setUser(row))
                setSidebarOpen(true)
                setToCreateMode(false)
              }}
            >
              <Archive size={14} className="mr-50" />
              <span className="align-middle">Edit</span>
            </DropdownItem>
            <DropdownItem
              className="w-100"
              onClick={() => {
                store.dispatch(deleteUser(row.id))
              }}
            >
              <Trash2 size={14} className="mr-50" />
              <span className="align-middle">Delete</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      )
    },
  },
]
