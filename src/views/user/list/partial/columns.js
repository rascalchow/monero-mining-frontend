import { useContext, useState } from 'react'
// ** React Imports
import { Link } from 'react-router-dom'
import { SidebarCtx } from '@context/user/sidebarContext'
// ** Third Party Components
import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  UncontrolledTooltip,
  DropdownItem,
  Button,
} from 'reactstrap'
import {
  Edit2,
  MoreVertical,
  FileText,
  Trash2,
  Archive,
  UserCheck,
  UserX,
  User,
  Award,
} from 'react-feather'
import { useProfileInfoCtx } from '@context/user/profileInfoContext'
import _ from 'lodash'
import { secondsToHMS } from '@utils'

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
  active: {
    class: 'text-info',
    icon: UserCheck,
  },
  rejected: {
    class: 'text-danger',
    icon: UserX,
  },
  pending: {
    class: 'text-warning',
    icon: User,
  },
}
const renderStatus = (row) => {
  const Icon = statusObj[row.status] ? statusObj[row.status].icon : User
  return (
    <span className="text-truncate text-capitalize align-middle">
      <Icon
        size={18}
        className={`${statusObj[row.status] ? statusObj[row.status].class : ''
          } mr-50`}
      />
    </span>
  )
}
const BADGE_COLOR = {
  active: 'light-info',
  pending: 'light-warning',
  rejected: 'light-danger',
}

export const columnsPublisher = [
  {
    name: 'Name',
    width: '10%',
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
    width: '10%',
    selector: 'companyName',
    sortable: true,
    cell: (row) => row.companyName,
  },
  {
    name: 'Installs',
    width: '8%',
    selector: 'installs',
    sortable: true,
    cell: (row) => row.installs,
  },
  {
    name: 'Live',
    width: '7%',
    selector: 'live',
    sortable: true,
    cell: (row) => row.live,
  },
  {
    name: 'Live Time(SEC)',
    width: '7%',
    selector: 'liveTime',
    sortable: true,
    cell: (row) => {
      return (
        <>
          <div id={'tooltip' + row._id} style={{ whiteSpace: 'nowrap' }}>
            {row.liveTime ? `${row.liveTime}  secs` : ''}
          </div>
          {row.liveTime && (
            <UncontrolledTooltip placement="top" target={'tooltip' + row._id}>
              {secondsToHMS(row.liveTime)}
            </UncontrolledTooltip>
          )}
        </>
      )
    },
  },

  {
    name: 'Success Rate',
    width: '7%',
    selector: 'successRate',
    sortable: true,
    cell: (row) => 1,
  },
  {
    name: 'Earnings',
    width: '7%',
    selector: 'earnings',
    sortable: true,
    cell: (row) => row.earnings,
  },
  {
    name: 'Referrals',
    width: '7%',
    selector: 'referrals',
    sortable: true,
    cell: (row) => row.referrals,
  },
  {
    name: 'Payments',
    width: '7%',
    selector: 'payments',
    sortable: true,
    cell: (row) => row.payments,
  },
  {
    name: 'Status',
    width: '6%',
    sortable: true,
    selector: 'stat',
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
    name: 'Primary',
    width: '6%',
    sortable: true,
    selector: 'stat',
    cell: (row) => row.isPrimary && (
      <Badge
        className="text-capitalize "
        color={'light-success'}
        pill
      >MASTER
      </Badge>
    ),
  },
  {
    name: 'Actions',
    width: '6%',
    cell: (row) => {
      const { setSidebarOpen, setToCreateMode } = useContext(SidebarCtx)
      const { usersInfo } = useProfileInfoCtx()
      return (
        <UncontrolledDropdown>
          <DropdownToggle tag="div" className="btn btn-sm">
            <MoreVertical size={14} className="cursor-pointer" />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem
              tag={Link}
              to={`/publisher/${row._id}`}
              className="w-100"
            >
              <FileText size={14} className="mr-50" />
              <span className="align-middle">Details</span>
            </DropdownItem>
            <DropdownItem
              className="w-100"
              onClick={() => {
                setSidebarOpen(true)
                setToCreateMode(false)
                usersInfo.setUser(row, row._id)
              }}
            >
              <Archive size={14} className="mr-50" />
              <span className="align-middle">Edit</span>
            </DropdownItem>
            <DropdownItem
              className="w-100"
              onClick={() => {
                usersInfo.setPrimaryUser(row._id)
              }}
            >
              <Award size={14} className="mr-50" />
              <span className="align-middle">Set Master Publisher</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      )
    },
  },
]

export const columnsAdmin = [
  {
    name: 'Name',
    width: '20%',
    selector: 'name',
    sortable: true,
    cell: (row) => row.name,
  },
  {
    name: 'Email',
    width: '20%',
    selector: 'email',
    sortable: true,
    cell: (row) => row.email,
  },
  {
    name: 'Status',
    width: '20%',
    sortable: true,
    selector: 'stat',
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
    name: 'phone',
    width: '20%',
    sortable: true,
    selector: 'phone',
    cell: (row) => row.phone,
  },
  {
    name: 'Actions',
    width: '20%',
    cell: (row) => {
      const { setSidebarOpen, setToCreateMode } = useContext(SidebarCtx)
      const { usersInfo } = useProfileInfoCtx()
      return (
        <UncontrolledDropdown>
          <DropdownToggle tag="div" className="btn btn-sm">
            <MoreVertical size={14} className="cursor-pointer" />
          </DropdownToggle>
          <DropdownMenu right>
            {/* <DropdownItem
              tag={Link}
              to={`/admin/${row._id}`}
              className="w-100"
            >
              <FileText size={14} className="mr-50" />
              <span className="align-middle">Details</span>
            </DropdownItem> */}
            <DropdownItem
              className="w-100"
              // onClick={() => {
              //   setSidebarOpen(true)
              //   setToCreateMode(false)
              //   usersInfo.setUser(row, row._id)
              // }}
              onClick={() => {
                setSidebarOpen(true)
                setToCreateMode(false)
                usersInfo.setUser(row, row._id)
              }}
            >
              <Archive size={14} className="mr-50" />
              <span className="align-middle">Edit</span>
            </DropdownItem>
            {/* <DropdownItem
              className="w-100"
              onClick={() => {
                store.dispatch(deleteUser(row.id))
              }}
            >
              <Trash2 size={14} className="mr-50" />
              <span className="align-middle">Delete</span>
            </DropdownItem> */}
          </DropdownMenu>
        </UncontrolledDropdown>
      )
    },
  },
]
