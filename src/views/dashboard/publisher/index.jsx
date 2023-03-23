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
  Button,
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
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import 'animate.css/animate.css'
import '@styles/base/plugins/extensions/ext-component-sweet-alerts.scss'
import { useAuthCtx } from '@context/authContext'

const MySwal = withReactContent(Swal)
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
  const { userData: authData } = useAuthCtx();
  const { appUsers } = useProfileInfoCtx()
  const CARD_LOADING_HEIGHT = 100; // Will be more dynamic by constant

  useEffect(() => {
    appUsers.loadAppStats();
  }, [])

  const handleQuestions = async () => {

    const steps = ['ADDRESS', 'CONFIRM', 'RESULT']

    let address = '';
    let currentStep
    for (currentStep = 0; currentStep < steps.length;) {
      if (steps[currentStep] == 'ADDRESS') {
        const result = await Swal.fire({
          confirmButtonText: 'Forward',
          cancelButtonText: 'Back',
          progressSteps: ['1', '2', '3'],
          showCancelButton: currentStep > 0,
          currentProgressStep: currentStep,
          reverseButtons: true,

          title: `Please input your payout address`,
          inputAttributes: {
            required: true
          },
          validationMessage: 'This field is required',
          input: 'text',
          inputValue: address,
        })
        if (result.value) {
          address = result.value;
          currentStep = 1
        } else {
          break
        }
      } else if (steps[currentStep] == 'CONFIRM') {
        const result = await Swal.fire({
          title: `Are you sure to withdraw ${Number(appUsers.appStatsInfo?.withdrawBalance || 0).toFixed(2)} ${authData?.payoutCurrency.toUpperCase()} to ${address}?`,
          confirmButtonText: 'Forward',
          cancelButtonText: 'Back',
          progressSteps: ['1', '2', '3'],
          currentProgressStep: currentStep,
          reverseButtons: true,
        })
        if (result.value) {
          const success = await appUsers.publisherWithdraw(address);
          if (success == 'success') {
            currentStep = 2;
          } else {
            console.log({ success })
            if (success == 'PENDING_WITHDRAWAL') {
              const result = await Swal.fire({
                title: `You still have to wait for pending withdrawal. Do you want to check the current status?`,
                confirmButtonText: 'Yes',
                cancelButtonText: 'Cancel',
                reverseButtons: true,
              })
              if (result.value) {
                const status = await appUsers.getPublisherWithdrawStatus();
                await Swal.fire({
                  title: `Overall Status: ${status.status}`,
                  confirmButtonText: 'OK',
                  html: `
                  <span>Amount: ${status.amount}</span> <br/>
                  <span>Date: ${new Date(status.createdAt).toLocaleString()}</span> <br/>
                  <span>Transaction Status: ${status.tx.status}</span> <br/>` +
                    (status.tx.status == 'confirmed' ? `<span>Confirms: ${status.tx.confirms}</span> <br/>` : '') +
                    `<span>TxHash: ${status.txHash}</span> <br/>
                `,
                })

              }
            }
            break;
          }
        } else if (result.dismiss === MySwal.DismissReason.cancel) {
          currentStep--
        } else {
          break
        }
      } else if (steps[currentStep] == 'RESULT') {
        await Swal.fire({
          title: `Congratulations!`,
          confirmButtonText: 'OK',
          progressSteps: ['1', '2', '3'],
          currentProgressStep: 2,
        })
        appUsers.loadAppStats();
        currentStep++
      }
    }
  }


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
            <Col sm={12} md={4}>
              {appUsers?.appStatsLoading ? (
                <Card>
                  <Spinner
                    className="spinner"
                    style={{ color: '#7367F0', margin: 'auto', marginTop: CARD_LOADING_HEIGHT, marginBottom: CARD_LOADING_HEIGHT }}
                  />
                </Card>
              ) : (
                <>
                  <StatsVertical
                    icon={<span>REV</span>}
                    color="danger"
                    stats={appUsers.appStatsInfo?.balance}
                    statTitle="Current Balance"
                  />
                  <Button color="primary" onClick={handleQuestions} outline> Withdraw</Button>
                </>
              )}
            </Col>
            <Col sm={12} md={4}>
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
            <Col sm={12} md={4}>
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
