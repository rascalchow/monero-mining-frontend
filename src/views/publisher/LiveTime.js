import { useState, useEffect } from 'react'
import Flatpickr from 'react-flatpickr'
import { Calendar, ChevronDown, Tv, UserCheck } from 'react-feather'
import { Bar } from 'react-chartjs-2'
import 'flatpickr/dist/flatpickr.css'
import Avatar from '@components/avatar'
import Select from 'react-select'
import {
  Card,
  CardBody,
  CardHeader,
  CustomInput,
  CardTitle,
  Row,
  Col,
  Label,
  Spinner,
} from 'reactstrap'
import { columns } from './partials/columns'
import DataTable from 'react-data-table-component'
import { useProfileInfoCtx } from '@context/user/profileInfoContext'
import { DURATION } from '@const/user'
import { selectThemeColors } from '@utils'
import { useParams, Redirect } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import { useSearchParams } from '@src/navigation'
import DebouceInput from 'react-debounce-input'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { APP_USER_SORT_KEY, RESTRICTED_APP_USER_COLUMN } from '@const/user'

const statusOptions = [
  { value: null, label: 'All' },
  { value: 'installed', label: 'Installed' },
  { value: 'uninstalled', label: 'Uninstalled' },
]
const CustomHeader = ({ sidebarOpen, setSidebarOpen }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  // const { setToCreateMode } = useContext(SidebarCtx)
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

const LiveTime = ({
  tooltipShadow,
  gridLineColor,
  labelColor,
  successColorShade,
}) => {
  const [duration, setDuration] = useState(DURATION)
  const [searchParams, setSearchParams] = useSearchParams()
  const { liveTime } = useProfileInfoCtx()
  const handleDuration = (e) => {
    if (e.length == 2) {
      setDuration(e)
    }
  }
  const loadData = () => {
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
    APP_USER_SORT_KEY.forEach((key) => {
      if (searchParams.get(key)) {
        query.filter[key] = searchParams.get(key)
      }
    })
    if (location.search) {
      liveTime.loadLiveTimeStats(duration, { ...query, filter: { ...query.filter } })
    }
  }

  useEffect(() => {
    loadData();
  }, [])

  useEffect(() => {
    loadData();
  }, [location.search, duration])


  if (searchParams.get('limit') === null || searchParams.get('page') === null) {
    searchParams.set('limit', 10)
    searchParams.set('page', 1)
    return <Redirect to={`${location.pathname}?${searchParams.toString()}`} />
  }

  const CustomPagination = () => {
    const count = Number(
      Math.ceil(
        liveTime.publisherLiveTimeStats.totalActiveUsers /
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

  return (
    <>
      <Row>
        <Col sm={12} md={6}>
          <Card className="card-congratulations-medal">
            <CardBody>
              <div className="d-flex justify-content-between align-items-end">
                <h3 className="fw-bolder mb-75">
                  {liveTime?.publisherLiveTimeStatsLoading ? (
                    <Spinner
                      className="spinner "
                      variant="primary"
                      style={{ color: '#7367F0' }}
                    />
                  ) : (
                    <div className="text-primary">
                      {liveTime.publisherLiveTimeStats?.current}
                    </div>
                  )}
                </h3>
                <Avatar color="light-primary" size="lg" icon={<UserCheck />} />
              </div>
              <p className="card-text mb-75">Current Active Session </p>
            </CardBody>
          </Card></Col>
        <Col sm={12} md={6}>
          <Card className="card-congratulations-medal">
            <CardBody>
              <div className="d-flex justify-content-between align-items-end">
                <h3 className="fw-bolder mb-75">
                  {liveTime?.publisherLiveTimeStatsLoading ? (
                    <Spinner
                      className="spinner "
                      variant="primary"
                      style={{ color: '#7367F0' }}
                    />
                  ) : (
                    <div className="text-primary">
                      {liveTime.publisherLiveTimeStats?.liveTimeSum} s
                    </div>
                  )}
                </h3>
                <Avatar color="light-primary" size="lg" icon={<Tv />} />
              </div>
              <p className="card-text mb-75">Live Time </p>
            </CardBody>
          </Card></Col>
      </Row>
      {!liveTime.publisherLiveTimeStatsLoading ? (
        <>
          <Card>
            <CardBody>
              <div className="session-info mb-1 mb-lg-0">
                <h2 className="font-weight-bold mb-25">Live Time Statistics</h2>
              </div>
              <Row className="w-full">
                <Col xs={{ size: 12 }}>
                  <Card>
                    <CardHeader className="d-flex justify-content-end">
                      {/* <CardTitle tag="h4">Latest Statistics</CardTitle> */}
                      <div className="d-flex align-items-center">
                        <Calendar size={14} />
                        <Flatpickr
                          onChange={(e) => handleDuration(e)}
                          options={{
                            mode: 'range',
                            defaultDate: duration,
                          }}
                          className="form-control flat-picker bg-transparent border-0 shadow-none"
                        />
                      </div>
                    </CardHeader>
                    <CardBody className="w-full">
                      <div style={{ height: '400px' }}>
                        <Bar
                          data={{
                            labels: liveTime?.publisherLiveTimeStats?.labels,
                            datasets: [
                              {
                                data: liveTime?.publisherLiveTimeStats?.data,
                                backgroundColor: successColorShade,
                                borderColor: 'transparent',
                                barThickness: 15,
                              },
                            ],
                          }}
                          options={{
                            elements: {
                              rectangle: {
                                borderWidth: 2,
                                borderSkipped: 'bottom',
                              },
                            },
                            responsive: true,
                            maintainAspectRatio: false,
                            responsiveAnimationDuration: 500,
                            legend: {
                              display: false,
                            },
                            tooltips: {
                              // Updated default tooltip UI
                              shadowOffsetX: 1,
                              shadowOffsetY: 1,
                              shadowBlur: 8,
                              shadowColor: tooltipShadow,
                              backgroundColor: '#fff',
                              titleFontColor: '#000',
                              bodyFontColor: '#000',
                            },
                            scales: {
                              xAxes: [
                                {
                                  display: true,
                                  gridLines: {
                                    display: true,
                                    color: gridLineColor,
                                    zeroLineColor: gridLineColor,
                                  },
                                  scaleLabel: {
                                    display: false,
                                  },
                                  ticks: {
                                    fontColor: labelColor,
                                  },
                                },
                              ],
                              yAxes: [
                                {
                                  display: true,
                                  gridLines: {
                                    color: gridLineColor,
                                    zeroLineColor: gridLineColor,
                                  },
                                  ticks: {
                                    stepSize: 100,
                                    min: 0,
                                    max: liveTime?.publisherLiveTimeStats?.max,
                                    fontColor: labelColor,
                                  },
                                },
                              ],
                            },
                          }}
                          height={400}
                        />
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </>
      ) : (
        <div className="table-loader-container">
          <Spinner className="spinner" />
        </div>
      )}
      {!liveTime.publisherLiveTimeStatsLoading ? (
        <>
          <div className="users-list-page">
            <Card>
              <CardHeader
                style={{
                  borderBottom: '1px solid #b4b7bd40',
                  textTransform: 'capitalize',
                }}
              >
                Active Users
              </CardHeader>
              <DataTable
                noHeader
                pagination
                subHeader
                responsive
                paginationServer
                columns={columns}
                progressPending={liveTime.publisherLiveTimeStatsLoading}
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
                data={liveTime.publisherLiveTimeStats?.activeUsers.docs}
                subHeaderComponent={<CustomHeader />}
              />
            </Card>
          </div>
        </>
      ) : (
        <div className="table-loader-container">
          <Spinner className="spinner" />
        </div>
      )}
    </>
  )
}

export default LiveTime
