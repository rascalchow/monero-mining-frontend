import { useState, useEffect } from 'react'
import Flatpickr from 'react-flatpickr'
import { Calendar, ChevronDown, UserCheck } from 'react-feather'
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

const Earnings = ({
  tooltipShadow,
  gridLineColor,
  labelColor,
  successColorShade,
}) => {
  const [duration, setDuration] = useState(DURATION)
  const handleDuration = (e) => {
    if (e.length == 2) {
      console.log({e})
      setDuration(e)
    }
  }
  const { appUsers } = useProfileInfoCtx()
  useEffect(() => {
    appUsers.loadPublisherInstallStats(duration);
  }, [duration])

  return (
    <>
      <Row>
        <Card className="card-congratulations-medal">
          <CardBody>
            <div className="d-flex justify-content-between align-items-end">
              <h3 className="fw-bolder mb-75">
                {appUsers?.publisherInstallsLoading ? (
                  <Spinner
                    className="spinner "
                    variant="primary"
                    style={{ color: '#7367F0' }}
                  />
                ) : (
                  <div className="text-primary">
                    {appUsers?.publisherInstallsChartData?.installsCount}
                  </div>
                )}
              </h3>
              <p className="card-text mb-75">Install Count</p>
              <Avatar color="light-primary" size="lg" icon={<UserCheck />} />
            </div>
          </CardBody>
        </Card>
        <Card className="card-congratulations-medal">
          <CardBody>
            <div className="d-flex justify-content-between align-items-end">
              <h3 className="fw-bolder mb-75">
                {appUsers?.publisherInstallsLoading ? (
                  <Spinner
                    className="spinner "
                    variant="primary"
                    style={{ color: '#7367F0' }}
                  />
                ) : (
                  <div className="text-primary">
                    {appUsers?.publisherInstallsChartData?.uninstallsCount}
                  </div>
                )}
              </h3>
              <p className="card-text mb-75">Uninstall Count </p>
              <Avatar color="light-primary" size="lg" icon={<UserCheck />} />
            </div>
          </CardBody>
        </Card>
        <Card className="card-congratulations-medal">
          <CardBody>
            <div className="d-flex justify-content-between align-items-end">
              <h3 className="fw-bolder mb-75">
                {appUsers?.publisherInstallsLoading ? (
                  <Spinner
                    className="spinner "
                    variant="primary"
                    style={{ color: '#7367F0' }}
                  />
                ) : (
                  <div className="text-primary">
                    {appUsers?.publisherInstallsChartData?.retentionRate} %
                  </div>
                )}
              </h3>
              <p className="card-text mb-75">Retention Rate </p>
              <Avatar color="light-primary" size="lg" icon={<UserCheck />} />
            </div>
          </CardBody>
        </Card>
      </Row>
      {!appUsers?.publisherInstallsLoading ? (
        <>
          <Card>
            <CardBody>
              <div className="session-info mb-1 mb-lg-0">
                <h2 className="font-weight-bold mb-25">Installs Statistics</h2>
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
                            labels: appUsers?.publisherInstallsChartData?.labels,
                            datasets: [
                              {
                                data: appUsers?.publisherInstallsChartData?.data,
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
                                    max: appUsers?.publisherInstallsChartData?.max,
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
    </>
  )
}

export default Earnings
