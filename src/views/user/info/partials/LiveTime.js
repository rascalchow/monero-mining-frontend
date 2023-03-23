import { useState, useEffect } from 'react'
import Flatpickr from 'react-flatpickr'
import { Calendar } from 'react-feather'
import { Bar } from 'react-chartjs-2'
import 'flatpickr/dist/flatpickr.css'

import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Row,
  Col,
  Spinner,
} from 'reactstrap'

import { useProfileInfoCtx } from '@context/user/profileInfoContext'
import { DURATION } from '@const/user'
import LiveTimeCount from './LiveTimeStatic'
import { LIVETIME } from '@const/user'
import { useParams } from 'react-router-dom'

const LiveTime = ({
  tooltipShadow,
  gridLineColor,
  labelColor,
  successColorShade,
}) => {
  const [duration, setDuration] = useState(DURATION)
  const { liveTime } = useProfileInfoCtx()
  const { id } = useParams()
  const handleDuration = (e) => {
    if (e.length == 2) {
      setDuration(e)
    }
  }

  useEffect(() => {
    liveTime.loadLiveTimeInfo(duration, 'CHART', id)
  }, [duration])

  return (
    <>
      {!liveTime.liveTimeChartLoading || !liveTime.liveTimeStaticLoading ? (
        <>
          <Row>
            {!liveTime.liveTimeStaticLoading ? (
              <>
                {LIVETIME.map((item, index) => {
                  return (
                    <Col key={index} sm={{ size: 4, order: 1 }}>
                      <LiveTimeCount
                        icon={item.icon}
                        name={item.name}
                        color={item.iconColor}
                        type={item.type}
                      />
                    </Col>
                  )
                })}
              </>
            ) : (
              <Col xl="12" lg="12" className="mt-2 mt-xl-0 px-2">
                <div className="table-loader-container">
                  <Spinner className="spinner" />
                </div>
              </Col>
            )}
          </Row>
          {!liveTime.liveTimeChartLoading ? (
            <Card>
              <CardBody>
                <div className="session-info mb-1 mb-lg-0">
                  <h2 className="font-weight-bold mb-25">
                    Live Time Statistics
                  </h2>
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
                              labels: liveTime?.liveTimeChartInfo?.labels,
                              datasets: [
                                {
                                  data: liveTime?.liveTimeChartInfo?.data,
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
                                      max: liveTime?.liveTimeChartInfo?.max,
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
          ) : (
            <div className="table-loader-container">
              <Spinner className="spinner" />
            </div>
          )}
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
