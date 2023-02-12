import { useState, useEffect } from 'react'
import Flatpickr from 'react-flatpickr'
import { Calendar, ChevronDown, UserCheck } from 'react-feather'
import { Bar } from 'react-chartjs-2'
import 'flatpickr/dist/flatpickr.css'
import Avatar from '@components/avatar'
import Select from 'react-select'
import Chart from 'react-apexcharts'
import {
  Card,
  CardBody,
  CardHeader,
  CustomInput,
  CardTitle,
  Row,
  Col,
  Label, CardText,
  Spinner,
} from 'reactstrap'
import { useProfileInfoCtx } from '@context/user/profileInfoContext'
import { DURATION } from '@const/user'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { useContext } from 'react'
import { ThemeColors } from '../../utility/context/ThemeColors'

const statusOptions = [
  { value: null, label: 'All' },
  { value: 'installed', label: 'Installed' },
  { value: 'uninstalled', label: 'Uninstalled' },
]


const Install = ({
  tooltipShadow,
  gridLineColor,
  labelColor,
  successColorShade,
}) => {
  const CARD_LOADING_HEIGHT = 100;
  const { colors } = useContext(ThemeColors)
  const [duration, setDuration] = useState(DURATION)
  const options = {
    chart: {
      sparkline: {
        enabled: true
      },
      dropShadow: {
        enabled: true,
        blur: 3,
        left: 1,
        top: 1,
        opacity: 0.1
      }
    },
    colors: ['#51e5a8'],
    plotOptions: {
      radialBar: {
        offsetY: 10,
        startAngle: -150,
        endAngle: 150,
        hollow: {
          size: '77%'
        },
        track: {
          background: '#ebe9f1',
          strokeWidth: '50%'
        },
        dataLabels: {
          name: {
            show: false
          },
          value: {
            color: colors.success.main,
            fontFamily: 'Montserrat',
            fontSize: '2.86rem',
            fontWeight: '600'
          }
        }
      }
    },
    fill: {
      type: 'solid'
    },
    stroke: {
      lineCap: 'round'
    },
    grid: {
      padding: {
        bottom: 30
      }
    }
  };
  const handleDuration = (e) => {
    if (e.length == 2) {
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
        <Col sm={12} md={3}>
          <Card className="card-congratulations-medal">
            {appUsers?.publisherInstallsLoading ? (
              <Spinner
                className="spinner "
                variant="primary"
                style={{ color: '#7367F0', margin: 'auto', marginTop: CARD_LOADING_HEIGHT, marginBottom: CARD_LOADING_HEIGHT }}
              />
            ) : (
              <>
                <CardHeader>
                  <CardTitle tag="h4">Installs Retention Rate</CardTitle>
                </CardHeader>
                <CardBody className="p-0">
                  <Chart
                    options={options}
                    series={[100 * (appUsers.publisherInstallsChartData?.installsCount > 0 ? (appUsers.publisherInstallsChartData?.installsCount - appUsers.publisherInstallsChartData?.uninstallsCount) / appUsers.publisherInstallsChartData?.installsCount : 0).toFixed(2)]}
                    type="radialBar"
                    height={245}
                  />
                </CardBody>
                <Row className="border-top text-center mx-0">
                  <Col xs="6" className="border-right py-1">
                    <CardText className="text-muted mb-0">Installs</CardText>
                    <h3 className="font-weight-bolder mb-0">{appUsers.publisherInstallsChartData?.installsCount}</h3>
                  </Col>
                  <Col xs="6" className="py-1">
                    <CardText className="text-muted mb-0">Uninstalls</CardText>
                    <h3 className="font-weight-bolder mb-0">{appUsers.publisherInstallsChartData?.uninstallsCount}</h3>
                  </Col>
                </Row>
              </>
            )}
          </Card>
        </Col>
        <Col sm={12} md={9}>
          {!appUsers?.publisherInstallsLoading ? (
            <>
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Installs Statistics</CardTitle>
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
                  <div>
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
            </>
          ) : (
            <div className="table-loader-container">
              <Spinner className="spinner" />
            </div>
          )}
        </Col>
      </Row>
    </>
  )
}

export default Install
