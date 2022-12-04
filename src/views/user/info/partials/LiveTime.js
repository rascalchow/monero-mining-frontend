import { useState } from 'react'
import Flatpickr from 'react-flatpickr'
import { Calendar } from 'react-feather'
import { Bar } from 'react-chartjs-2'
import { DollarSign } from 'react-feather'

import {
  Card,
  CardBody,
  CardText,
  CardHeader,
  CardTitle,
  Row,
  Col,
  Button,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Media,
  Progress,
  Spinner,
  Badge,
} from 'reactstrap'
import Avatar from '@components/avatar'

import { DURATION } from './profileInfoContext'

const tooltipShadow = 'rgba(0, 0, 0, 0.25)',
  gridLineColor = 'rgba(200, 200, 200, 0.2)',
  successColorShade = '#28dac6'
const LiveTime = ({
  tooltipShadow,
  gridLineColor,
  labelColor,
  successColorShade,
}) => {
  const options = {
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
              max: 400,
              fontColor: labelColor,
            },
          },
        ],
      },
    },
    data = {
      labels: [
        '7/12',
        '8/12',
        '9/12',
        '10/12',
        '11/12',
        '12/12',
        '13/12',
        '14/12',
        '15/12',
        '16/12',
        '17/12',
      ],
      datasets: [
        {
          data: [275, 90, 190, 205, 125, 85, 55, 87, 127, 150, 230, 280, 190],
          backgroundColor: successColorShade,
          borderColor: 'transparent',
          barThickness: 15,
        },
      ],
    }
    const [duration, setDuration] = useState(DURATION[0])

  return (
    <>
      <Card>
        <CardBody>
          <Row className="pb-50">
            <Col
              sm={{ size: 4, order: 1 }}
              xs={{ order: 2 }}
              className="d-flex justify-content-around flex-column mt-lg-0 mt-2"
            >
              <div className="session-info mb-1 mb-lg-0">
                <h2 className="font-weight-bold mb-25">
                  Live Time Information
                </h2>
              </div>
              <Row>
                <Col xs="6">
                  <Media>
                    <Avatar
                      color="light-success"
                      icon={<DollarSign size={24} />}
                      className="mr-2"
                    />
                    <Media className="my-auto" body>
                      <h4 className="font-weight-bolder mb-0">23423</h4>
                      <CardText className="font-small-3 mb-0">
                        Earnings
                      </CardText>
                    </Media>
                  </Media>
                </Col>
                <Col xs="6">
                  <Media>
                    <Avatar
                      color="light-warning"
                      icon={<DollarSign size={24} />}
                      className="mr-2"
                    />
                    <Media className="my-auto" body>
                      <h4 className="font-weight-bolder mb-0">334</h4>
                      <CardText className="font-small-3 mb-0">
                        Payments
                      </CardText>
                    </Media>
                  </Media>
                </Col>
              </Row>
            </Col>
            <Col
              sm={{ size: 8, order: 2 }}
              xs={{ order: 1 }}
              className="d-flex justify-content-between flex-column text-right"
            >
              <UncontrolledDropdown className="chart-dropdown">
                <DropdownToggle
                  color=""
                  className="bg-transparent btn-sm border-0 p-50"
                >
                  {duration.name}
                </DropdownToggle>
                <DropdownMenu right>
                  {DURATION.map((item, index) => (
                    <DropdownItem
                      className="w-100"
                      key={index}
                      onClick={() => {
                        setDuration(item)
                      }}
                    >
                      {item.name}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </UncontrolledDropdown>
              <Card>
                <CardHeader className="d-flex justify-content-between align-items-sm-center align-items-start flex-sm-row flex-column">
                  <CardTitle tag="h4">Latest Statistics</CardTitle>
                  <div className="d-flex align-items-center">
                    <Calendar size={14} />
                    <Flatpickr
                      options={{
                        mode: 'range',
                        defaultDate: ['2019-05-01', '2019-05-10'],
                      }}
                      className="form-control flat-picker bg-transparent border-0 shadow-none"
                    />
                  </div>
                </CardHeader>
                <CardBody>
                  <div style={{ height: '400px' }}>
                    <Bar data={data} options={options} height={400} />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </>
  )
}

export default LiveTime
