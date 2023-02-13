// ** React Imports
import { useEffect, useState, useContext } from 'react'
// ** Custom Components
import { Link } from 'react-router-dom'
import {
  Card,
  CardBody,
  CardText,
  CardHeader,
  CardTitle,
  Row,
  Col,
  Spinner,
} from 'reactstrap'
import Chart from 'react-apexcharts'
import 'flatpickr/dist/flatpickr.css'
import _ from 'lodash'
import { DollarSign, CreditCard, BarChart2, UserPlus } from 'react-feather'
import './style.scss'
import { useProfileInfoCtx } from '@context/user/profileInfoContext'
import { ThemeColors } from '@context/ThemeColors'
import StatsWithLineChart from '@components/widgets/stats/StatsWithLineChart'
import StatsVertical from '@components/widgets/stats/StatsVertical'

const PublisherHome = () => {

  const { colors } = useContext(ThemeColors);

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

  const { appUsers } = useProfileInfoCtx()
  const CARD_LOADING_HEIGHT = 100; // Will be more dynamic by constant

  useEffect(() => {
    appUsers.loadAppStats();
  }, [])
  return (
    <>
      <Row>
        <Col sm={12} md={4}>
          {appUsers?.appStatsLoading ? (
            <Card>
              <Spinner
                className="spinner"
                style={{ color: '#7367F0', margin: 'auto', marginTop: CARD_LOADING_HEIGHT, marginBottom: CARD_LOADING_HEIGHT }}
              />
            </Card>
          ) : (
            <StatsWithLineChart
              icon={<DollarSign size={21} />}
              color="primary"
              stats={"$ " + appUsers.appStatsInfo?.earnings}
              statTitle="Today's Earnings"
              series={[
                {
                  name: 'Traffic Rate',
                  data: [150, 200, 125, 225, 200, 250]
                }
              ]}
              type="line"
            />
          )}
          <Row>
            <Col sm={12} md={6}>
              {appUsers?.appStatsLoading ? (
                <Card>
                  <Spinner
                    className="spinner"
                    style={{ color: '#7367F0', margin: 'auto', marginTop: CARD_LOADING_HEIGHT, marginBottom: CARD_LOADING_HEIGHT }}
                  />
                </Card>
              ) : (
                <StatsVertical
                  icon={<CreditCard size={21} />}
                  color="danger"
                  stats={appUsers.appStatsInfo?.lastPayment}
                  statTitle="Last Payout"
                />
              )}
            </Col>
            <Col sm={12} md={6}>
              {appUsers?.appStatsLoading ? (
                <Card>
                  <Spinner
                    className="spinner"
                    style={{ color: '#7367F0', margin: 'auto', marginTop: CARD_LOADING_HEIGHT, marginBottom: CARD_LOADING_HEIGHT }}
                  />
                </Card>
              ) : (
                <StatsVertical
                  icon={<UserPlus size={21} />}
                  color="primary"
                  stats={appUsers.appStatsInfo?.referrals}
                  statTitle="Referrals"
                />
              )}
            </Col>
          </Row>
        </Col>
        <Col sm={12} md={4}>
          <Card className="card-congratulations-medal">
            {appUsers?.appStatsLoading ? (
              <Spinner
                className="spinner "
                variant="primary"
                style={{ color: '#7367F0', margin: 'auto', marginTop: CARD_LOADING_HEIGHT, marginBottom: CARD_LOADING_HEIGHT }}
              />
            ) : (
              <>
                <CardHeader>
                  <CardTitle tag="h4">Installs Retention Rate</CardTitle>
                  <Link to={'/installs'}>
                    <BarChart2 size={18} className="text-muted cursor-pointer" /> </Link>
                </CardHeader>
                <CardBody className="p-0">
                  <Chart
                    options={options}
                    series={[100 * (appUsers.appStatsInfo?.installs > 0 ? (appUsers.appStatsInfo?.installs - appUsers.appStatsInfo?.uninstalls) / appUsers.appStatsInfo?.installs : 0).toFixed(2)]}
                    type="radialBar"
                    height={245}
                  />
                </CardBody>
                <Row className="border-top text-center mx-0">
                  <Col xs="6" className="border-right py-1">
                    <CardText className="text-muted mb-0">Installs</CardText>
                    <h3 className="font-weight-bolder mb-0">{appUsers.appStatsInfo?.installs}</h3>
                  </Col>
                  <Col xs="6" className="py-1">
                    <CardText className="text-muted mb-0">Uninstalls</CardText>
                    <h3 className="font-weight-bolder mb-0">{appUsers.appStatsInfo?.uninstalls}</h3>
                  </Col>
                </Row>
              </>
            )}
          </Card>
        </Col>
        <Col sm={12} md={4}>
          <Card className="card-congratulations-medal">
            {appUsers?.appStatsLoading ? (
              <Spinner
                className="spinner "
                variant="primary"
                style={{ color: '#7367F0', margin: 'auto', marginTop: CARD_LOADING_HEIGHT, marginBottom: CARD_LOADING_HEIGHT }}
              />
            ) : (
              <>
                <CardHeader>
                  <CardTitle tag="h4">Live Success Rate</CardTitle>
                  <Link to={'/live-time'}>
                    <BarChart2 size={18} className="text-muted cursor-pointer" /> </Link>
                </CardHeader>
                <CardBody className="p-0">
                  <Chart
                    options={options}
                    series={[100 * (appUsers.appStatsInfo?.installs > 0 ? (appUsers.appStatsInfo?.live / appUsers.appStatsInfo?.installs) : 0).toFixed(2)]}
                    type="radialBar"
                    height={245}
                  />
                </CardBody>
                <Row className="border-top text-center mx-0">
                  <Col xs="6" className="border-right py-1">
                    <CardText className="text-muted mb-0">Live</CardText>
                    <h3 className="font-weight-bolder mb-0">{appUsers.appStatsInfo?.live}</h3>
                  </Col>
                  <Col xs="6" className="py-1">
                    <CardText className="text-muted mb-0">Live Time</CardText>
                    <h3 className="font-weight-bolder mb-0">{appUsers.appStatsInfo?.liveTime} s</h3>
                  </Col>
                </Row>
              </>
            )}
          </Card>
        </Col>
      </Row >

    </>
  )
}

export default PublisherHome
