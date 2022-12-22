import './invite.css'
import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  UncontrolledTooltip,
  DropdownItem,
} from 'reactstrap'
import { MoreVertical, Trash2, Clipboard } from 'react-feather'
import _ from 'lodash'
import { toast } from 'react-toastify'
// ** moment
import moment from 'moment'

const APP_URL = 'http://localhost:3000'
const BADGE_COLOR = {
  invited: 'light-warning',
  signup: 'light-info',
}

export const columns =(cancelInvite) => [
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
                navigator.clipboard.writeText(row.code)
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
    name: 'Referral Url',
    cell: (row) => {
      return (
        <>
          <div className="flex nowrap justify-content-between">
            {row._id}
            <Clipboard
              size={18}
              className="clipboard"
              onClick={() => {
                navigator.clipboard.writeText(
                  `${APP_URL}/register?referralInvite=${row._id}`,
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
  {
    name: 'Actions',
    width: '20%',
    cell: (row) => {
      return (
        <UncontrolledDropdown>
          <DropdownToggle tag="div" className="btn btn-sm">
            <MoreVertical size={14} className="cursor-pointer" />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem
              disabled={row.status == 'signup' || row.expired}
              className="w-100"
              onClick={() => {
                cancelInvite(row._id)
              }}
            >
              <Trash2 size={14} className="mr-50" />
              <span className="align-middle">Cancel</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      )
    },
  },
]
