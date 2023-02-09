import { useEffect } from 'react'
import { referralsColumn } from './partials/columns'
// ** Store & Actions
import { useLocation, Redirect, useParams } from 'react-router-dom'
// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { ChevronDown, Cpu } from 'react-feather'
import DataTable from 'react-data-table-component'
import {
  Card,
  Row,
  Col,
  Label,
  CustomInput,
  Spinner,
  CardHeader,
} from 'reactstrap'
import { selectThemeColors } from '@utils'
import Select from 'react-select'
import DebouceInput from 'react-debounce-input'
// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

// ** context hooks
import { useSearchParams } from '@src/navigation'
import { useProfileInfoCtx } from '@context/user/profileInfoContext'
// ** const
import { REFERRALS_SORT_KEY } from '@const/user'
import { useSelector } from 'react-redux'

const statusOptions = [
  { value: null, label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'pending', label: 'Pending' },
  { value: 'rejected', label: 'Rejected' },
]

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
              <DebouceInput
                minLength={2}
                debounceTimeout={500}
                id="search-invoice"
                className="ml-50 w-100 debounce-input"
                type="text"
                value={searchParams.get('search') || ''}
                onChange={(e) => {
                  setSearchParams({ search: e.target.value, page: 1 })
                }}
              />
            </div>
          </Col>
          <Col sm="4" lg="4">
            <Select
              theme={selectThemeColors}
              isClearable={false}
              className="react-select"
              classNamePrefix="select"
              options={statusOptions}
              value={statusOptions.find(
                (it) => it.value === searchParams.get('status'),
              )}
              onChange={(opt) => {
                setSearchParams({
                  status: opt.value,
                  page: 1,
                })
              }}
              placeholder="Select Status"
            />
          </Col>
        </Col>
      </Row>
    </div>
  )
}

const Invites = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { referralsInfo } = useProfileInfoCtx()
  const location = useLocation()

  useEffect(() => {
    const limit = parseInt(searchParams.get('limit'))
    const page = parseInt(searchParams.get('page'))
    const query = {
      limit,
      page,
      filter: {},
    }
    if (searchParams.get('search')) {
      query.filter['search'] = searchParams.get('search')
    }
    if (searchParams.get('status')) {
      query.filter['status'] = searchParams.get('status')
    }
    REFERRALS_SORT_KEY.forEach((key) => {
      if (searchParams.get(key)) {
        query.filter[key] = searchParams.get(key)
      }
    })
    try {
      if (location.search)
        referralsInfo.loadPublisherReferrals(
          { ...query, filter: { ...query.filter } },
        )
    } catch (error) {
      history.push('/not-authorized')
    }
  }, [location.search])
  const CustomPagination = () => {
    const count = Number(
      Math.ceil(
        referralsInfo.referrals?.totalDocs /
        parseInt(searchParams.get('limit')),
      ),
    )

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
  if (searchParams.get('limit') === null || searchParams.get('page') === null) {
    searchParams.set('limit', 10)
    searchParams.set('page', 1)
    return <Redirect to={`${location.pathname}?${searchParams.toString()}`} />
  }

  if (searchParams.get('limit') === null || searchParams.get('page') === null) {
    return null
  } else {
    return (
      <div className="users-list-page">
        <Card>
          <CardHeader
            style={{
              borderBottom: '1px solid #b4b7bd40',
              textTransform: 'capitalize',
            }}
          >
            Referrals
          </CardHeader>
          <DataTable
            noHeader
            pagination
            subHeader
            responsive
            paginationServer
            columns={referralsColumn}
            progressPending={referralsInfo.isReferralsLoading}
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
            data={referralsInfo?.referrals?.docs}
            subHeaderComponent={<CustomHeader />}
          />
        </Card>
      </div>
    )
  }
}

export default Invites
