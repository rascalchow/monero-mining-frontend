import {
  useState,
  useEffect,
} from 'react'

import Proptypes from 'prop-types'

import { columns } from './columns'

// ** Store & Actions
import { getUsers } from '../store/action'
import { useDispatch, useSelector } from 'react-redux'

// ** Third Party Components
import Select from 'react-select'
import ReactPaginate from 'react-paginate'
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import { selectThemeColors } from '@utils'

import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Input,
  Row,
  Col,
  Label,
  CustomInput,
  Button,
} from 'reactstrap'

import Sidebar from './Sidebar'
import { useSearchParams } from '@src/navigation'
// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'


const roleOptions = [
  { value: null, label: 'All' },
  { value: 'admin', label: 'Admin' },
  { value: 'publisher', label: 'Publisher' },
]

const statusOptions = [
  { value: null, label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
]

const CustomHeader = ({
  sidebarOpen,
  setSidebarOpen
}) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const onPageSizeChange = (e) => {
    setSearchParams(
      {
        limit: e.target.value,
        page: 1
      },
      true
    )
  }
  return (
    <div className="invoice-list-table-header w-100 mr-1 ml-50 mt-2 mb-75">
      <Row>
        <Col xl="6" className="d-flex align-items-center p-0">
          <div className="d-flex align-items-center w-100">
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
              onChange = {onPageSizeChange}
              value={searchParams.get('limit')}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </CustomInput>
            <Label for="rows-per-page">Entries</Label>
          </div>
        </Col>
        <Col
          xl="6"
          className="d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mt-lg-0 mt-1"
        >
          <div className="d-flex align-items-center mb-sm-0 mb-1 mr-1">
            <Label className="mb-0" for="search-invoice">
              Search:
            </Label>
            <Input
              id="search-invoice"
              className="ml-50 w-100"
              type="text"
              value={searchParams.get('search') || ''}
              onChange={(e) => setSearchParams({'search': e.target.value})}
            />
          </div>
          <Button.Ripple
            color="primary"
            onClick={()=>{setSidebarOpen(true)}}
            disabled={sidebarOpen}
          >
            Add New User
          </Button.Ripple>
        </Col>
      </Row>
    </div>
  )
}

CustomHeader.propTypes = {
  sidebarOpen: Proptypes.bool.isRequired,
  setSidebarOpen: Proptypes.func.isRequired
}

const UsersTable = () => {
  const dispatch = useDispatch()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const store = useSelector((state) => state.user)
  
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    const limit = parseInt(searchParams.get('limit'))
    const query = {
      limit,
      page: parseInt(searchParams.get('page')),
      filter: {}
    }
    if (searchParams.get('status')) {
      query.filter['status'] = searchParams.get('status')
    }
    if (searchParams.get('role')) {
      query.filter['role'] = searchParams.get('role')
    }
    dispatch(getUsers(query))
  }, [dispatch, searchParams.toString()])

  const CustomPagination = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const count = Number(Math.ceil(store.total / parseInt(searchParams.get('limit'))))
    
    return (
      <ReactPaginate
        forcePage={parseInt(searchParams.get('page')) -1}
        onPageChange={(page)=>{setSearchParams({page: page.selected + 1})}}
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
  return (
    <div className="users-list-page">
      <Card>
        <CardHeader>
          <CardTitle tag="h4">Search Filter</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md="6">
              <Select
                isClearable={false}
                theme={selectThemeColors}
                className="react-select"
                classNamePrefix="select"
                options={roleOptions}
                value={roleOptions.find(it=>it.value === searchParams.get('role'))}
                placeholder="Select Role"
                onChange={opt=>{setSearchParams({
                  'role': opt.value,
                  'page': 1,
                })}}
              />
            </Col>
            <Col md="6">
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={statusOptions}
                value={statusOptions.find(it=>it.value === searchParams.get('status'))}
                onChange={opt=>{setSearchParams({
                  'status': opt.value,
                  'page': 1
                })}}
                placeholder="Select Status"
              />
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Card>
        <DataTable
          noHeader
          pagination
          subHeader
          responsive
          paginationServer
          columns={columns}
          sortIcon={<ChevronDown />}
          className="react-dataTable"
          paginationComponent={CustomPagination}
          data={store.data}
          subHeaderComponent={(
            <CustomHeader
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
            />
          )}
        />
      </Card>

      <Sidebar open={sidebarOpen} toggleSidebar={()=>{setSidebarOpen(state=>!state)}} />
    </div>
  )
}

export default UsersTable
