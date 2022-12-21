import { useContext, useState } from 'react'
// ** React Imports
import { Link } from 'react-router-dom'

import { useSearchParams } from '@src/navigation'
// ** Store & Actions
import { store } from '@store/storeConfig/store'
import { useLocation } from 'react-router-dom'
// ** Third Party Components
import './invite.css'
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
  Clipboard,
} from 'react-feather'
import { useProfileInfoCtx } from '@context/user/profileInfoContext'
import _ from 'lodash'
import { toast } from 'react-toastify'
import { formatDate } from '@utils'
// ** moment
import moment from 'moment'
const APP_URL = 'http://localhost:3000'
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
    cell: (row) => {
      return (
        <>
          <div className="flex nowrap justify-content-between">
            {row.code}
            <Clipboard
              size={18}
              className="clipboard"
              onClick={() => {
                navigator.clipboard.writeText(
                  `${APP_URL}/register?referralInvite=${row.code}`,
                )
                toast('Copied to clipboard!', { type: 'success' })
              }}
              id={'tooltip' + row._id}
            />
            <UncontrolledTooltip placement="top" target={'tooltip' + row._id}>
              Copy to clipboard
            </UncontrolledTooltip>
          </div>
        </>
      )
    },
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
    cell: (row) => (row.acceptedAt ? moment(row.acceptedAt).fromNow() : ''),
  },
  {
    name: 'Invited At',
    selector: 'createdAt',
    sortable: true,
    cell: (row) => moment(row.createdAt).fromNow(),
  },
]
