import { useContext } from 'react'
// ** React Imports
import { Link } from 'react-router-dom'

import { useSearchParams } from '@src/navigation'
// ** Store & Actions
import { setUser, deleteUser } from '../../store/action'
import { store } from '@store/storeConfig/store'
import { SidebarCtx } from './sidebarContext'

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
    minWidth: '180px',
    selector: 'name',
    sortable: true,
    cell: (row) => <Link to={`/user/view/${row._id}`}>{row['name']}</Link>,
  },
  {
    name: 'Email',
    minWidth: '220px',
    selector: 'email',
    sortable: true,
    cell: (row) => row.email,
  },
  {
    name: 'Company',
    minWidth: '270px',
    selector: 'companyName',
    sortable: true,
    cell: (row) => row.companyName,
  },
  {
    name: 'Role',
    minWidth: '172px',
    sortable: false,
    selector: 'role',
    cell: (row) => renderRole(row),
  },
  {
    name: 'Status',
    minWidth: '138px',
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
    minWidth: '100px',
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
