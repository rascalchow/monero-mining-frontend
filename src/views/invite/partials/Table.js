import { useState, useEffect, useContext } from 'react'

import Proptypes from 'prop-types'

import { columns } from './columns'

// ** Store & Actions
import { useDispatch } from 'react-redux'
// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { ChevronDown, Cpu } from 'react-feather'
import DataTable from 'react-data-table-component'

import {
  Card,
  Input,
  Row,
  Col,
  Label,
  CustomInput,
  Button,
  Spinner,
  CardHeader,
} from 'reactstrap'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
// ** Partials
import SidebarInvitations from './Sidebar'
//** Hooks
import { useSearchParams } from '@src/navigation'
import useInvite from '@hooks/useInvite'

const CustomHeader = ({ sidebarOpen, setSidebarOpen }) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const onPageSizeChange = (e) => {
    setSearchParams(
      {
        limit: e.target.value,
        page: 1,
      },
      true,
    )
  }
  const onHandleInvitation = (val) => {
    setSidebarOpen(val)
  }
  return (
    <div className="invoice-list-table-header w-100 mr-1 ml-50 mt-1 ">
      <Row>
        <Col
          sm="4"
          className="d-flex align-items-center p-0 justify-content-between  mb-1"
        >
          <Col sm="8" className="d-flex align-items-center w-100">
            <Label for="rows-per-page">Show</Label>
            <CustomInput
              className="form-control mx-50"
              type="select"
              id="rows-per-page"
              style={{
                width: '5rem',
                padding: '0 0.8rem',
                backgroundPosition:
                  'calc(100% - 3px) 11px, calc(100% - 20px) 13px, 100% 0',
              }}
              onChange={onPageSizeChange}
              value={searchParams.get('limit')}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </CustomInput>
            <Label for="rows-per-page">Entries</Label>
          </Col>
        </Col>
        <Col
          sm="8"
          className="d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mb-1"
        >
          <Col sm="8" lg="6">
            <div className="d-flex align-items-center mb-sm-0 mb-1 mr-1">
              <Label className="mb-0" for="search-invoice">
                Search:
              </Label>
              <Input
                id="search-invoice"
                className="ml-50 w-100"
                type="text"
                value={searchParams.get('search') || ''}
                onChange={(e) => {
                  setSearchParams({ search: e.target.value, page: 1 })
                }}
              />
            </div>
          </Col>
          <Col sm="4" lg="3">
            <Button.Ripple
              color="primary"
              block
              onClick={(e) => onHandleInvitation(!sidebarOpen)}
            >
              Invite
            </Button.Ripple>
          </Col>
        </Col>
      </Row>
    </div>
  )
}

CustomHeader.propTypes = {
  sidebarOpen: Proptypes.bool.isRequired,
  setSidebarOpen: Proptypes.func.isRequired,
}

const InviteTable = ({ invites, isLoading }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const count = Number(
    Math.ceil(invites?.totalDocs / parseInt(searchParams.get('limit'))),
  )

  const CustomPagination = () => {
    return (
      <ReactPaginate
        forcePage={parseInt(searchParams.get('page')) - 1}
        onPageChange={(page) => {
          setSearchParams({ page: page.selected + 1 })
        }}
        previousLabel={''}
        nextLabel={''}
        pageCount={count || 1}
        activeClassName="active"
        pageClassName={'page-item'}
        nextLinkClassName={'page-link'}
        nextClassName={'page-item next'}
        previousClassName={'page-item prev'}
        previousLinkClassName={'page-link'}
        pageLinkClassName={'page-link'}
        containerClassName={
          'pagination react-paginate justify-content-end my-2 pr-1'
        }
      />
    )
  }
  const handleSort = async (column, sortDirection) => {
    setSearchParams(
      {
        page: searchParams.get('page'),
        limit: searchParams.get('limit'),
        search: searchParams.get('search'),
        [column.selector]: sortDirection,
        page: 1,
      },
      true,
    )
  }
  return (
    <div className="users-list-page">
      <Card>
        <CardHeader
          style={{
            borderBottom: '1px solid #b4b7bd40',
            textTransform: 'capitalize',
          }}
        >
          Invitations
        </CardHeader>
        <DataTable
          noHeader
          pagination
          subHeader
          responsive
          paginationServer
          columns={columns}
          progressPending={isLoading}
          progressComponent={
            <div className="table-loader-container">
              <Spinner className="spinner" />
            </div>
          }
          sortServer={true}
          onSort={handleSort}
          sortIcon={<ChevronDown />}
          className="react-dataTable"
          paginationComponent={CustomPagination}
          data={invites?.docs}
          subHeaderComponent={
            <CustomHeader
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
            />
          }
        />
      </Card>
      <SidebarInvitations
        open={!!sidebarOpen}
        toggleSidebar={() => {
          setSidebarOpen(!sidebarOpen)
        }}
      />
    </div>
  )
}

export default InviteTable
