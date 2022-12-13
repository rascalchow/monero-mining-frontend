import { useContext, useState } from 'react'
// ** React Imports
import { Link } from 'react-router-dom'

import { useSearchParams } from '@src/navigation'
// ** Store & Actions
import { store } from '@store/storeConfig/store'
import { useLocation } from 'react-router-dom'
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
} from 'react-feather'
import { useProfileInfoCtx } from '@context/user/profileInfoContext'
import _ from 'lodash'
import { secondsToHMS } from '@utils'

const BADGE_COLOR = {
  invited: 'light-warning',
  signup: 'light-info',
}

export const columns = [
  {
    name: 'Email',
    selector: 'refereeEmail',
    sortable: true,
    cell: (row) => row.refereeEmail,
  },
  {
    name: 'Code',
    selector: 'code',
    sortable: true,
    cell: (row) => row.code,
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
    name: 'Accepted At',
    selector: 'acceptedAt',
    sortable: true,
    cell: (row) => row.acceptedAt,
  },
  {
    name: 'Invited At',
    selector: 'createdAt',
    sortable: true,
    cell: (row) => row.createdAt,
  },
]
