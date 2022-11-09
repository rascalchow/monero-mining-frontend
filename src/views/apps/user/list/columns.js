// ** React Imports
import { Link } from 'react-router-dom'

// ** Store & Actions
import { getUser, deleteUser } from '../store/action'
import { store } from '@store/storeConfig/store'

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
    sortable: true,
    cell: (row) => row.email,
  },
  {
    name: 'Company',
    minWidth: '270px',
    sortable: true,
    cell: (row) => _.get(row, 'userProfileId.companyName', ''),
  },
  {
    name: 'Role',
    minWidth: '172px',
    selector: 'role',
    sortable: true,
    cell: (row) => renderRole(row),
  },
  {
    name: 'Status',
    minWidth: '138px',
    selector: 'status',
    sortable: true,
    cell: (row) => (
      <Badge className="text-capitalize" color={statusObj[row.status]} pill>
        {row.status}
      </Badge>
    ),
  },
  {
    name: 'Actions',
    minWidth: '100px',
    cell: (row) => (
      <UncontrolledDropdown>
        <DropdownToggle tag="div" className="btn btn-sm">
          <MoreVertical size={14} className="cursor-pointer" />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem
            tag={Link}
            to={`/user/view/${row.id}`}
            className="w-100"
            onClick={() => store.dispatch(getUser(row.id))}
          >
            <FileText size={14} className="mr-50" />
            <span className="align-middle">Details</span>
          </DropdownItem>
          <DropdownItem
            tag={Link}
            to={`/apps/user/edit/${row.id}`}
            className="w-100"
            onClick={() => store.dispatch(getUser(row.id))}
          >
            <Archive size={14} className="mr-50" />
            <span className="align-middle">Edit</span>
          </DropdownItem>
          <DropdownItem
            className="w-100"
            onClick={() => store.dispatch(deleteUser(row.id))}
          >
            <Trash2 size={14} className="mr-50" />
            <span className="align-middle">Delete</span>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    ),
  },
]
