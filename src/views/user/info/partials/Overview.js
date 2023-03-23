// ** React Imports
import { useEffect, useState, useContext } from 'react'
import { useDispatch } from 'react-redux'
// ** Custom Components
import Avatar from '@components/avatar'
import { TrendingUp, User, Box, DollarSign, Key, FileText, MessageCircle } from 'react-feather'
import {
  Card,
  CardBody,
  CardText,
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
import Chart from 'react-apexcharts'
import Flatpickr from 'react-flatpickr'
import 'flatpickr/dist/flatpickr.css'
import {
  Flag,
  Phone,
  Grid,
  Server,
  Voicemail,
  Globe,
  Calendar,
} from 'react-feather'
import { useParams } from 'react-router-dom'
import _ from 'lodash'
import Description from '@components/description'
import { COUNTRIES } from '@src/constants.js'
import './style.scss'
import { useProfileInfoCtx } from '@context/user/profileInfoContext'
import { DURATION } from '@const/user'
import Sidebar from '../../partials/Sidebar'
import { SidebarCtx } from '@context/user/sidebarContext'

const STATUS_COLOR = {
  active: 'success',
  rejected: 'danger',
  pending: 'primary',
}

const options = {
  chart: {
    sparkline: { enabled: true },
    toolbar: { show: false },
  },
  grid: {
    show: false,
    padding: {
      left: 0,
      right: 0,
    },
  },
  states: {
    hover: {
      filter: 'none',
    },
  },
  colors: ['#ebf0f7', '#ebf0f7', '#ebf0f7', '#ebf0f7', '#ebf0f7', '#ebf0f7'],
  plotOptions: {
    bar: {
      columnWidth: '45%',
      distributed: true,
      endingShape: 'rounded',
    },
  },
  tooltip: {
    x: { show: false },
  },
  xaxis: {
    type: 'numeric',
  },
}

const Overview = () => {
  // const {overview} = useProfileInfoCtx()
  const [isApproving, setIsApproving] = useState(false)
  const [isRejecting, setIsRejecting] = useState(false)
  const [duration, setDuration] = useState(DURATION)
  const { overview, installs, usersInfo, appUsers } = useProfileInfoCtx()
  const { sidebarOpen, setSidebarOpen } = useContext(SidebarCtx)
  const { id } = useParams()
  console.log(overview?.profileInfo?._doc)
  const onApproveUserClick = () => {
    try {
      setIsApproving(true)
      usersInfo.approveUser(id)
      setIsApproving(false)
    } catch (error) {
      setIsApproving(false)
    }
  }

  const onRejectUserClick = () => {
    try {
      setIsRejecting(true)
      usersInfo.rejectUser(id)
      setIsRejecting(false)
    } catch (error) {
      setIsRejecting(false)
    }
  }
  const onEditUserClick = () => {
    setSidebarOpen(true)
  }
  const handleDuration = (e) => {
    if (e.length == 2) {
      setDuration(e)
      installs.loadInstalledUsers(e, id)
    }
  }
  if (!overview.loading)
    return (
      <>
        <Card className="main-info-card">
          <CardBody>
            <div className="d-flex justify-content-end">
              <Badge color={STATUS_COLOR[overview.profileInfo?._doc.status]}>
                {overview.profileInfo?._doc.status}
              </Badge>
            </div>
            <Row>
              <Col
                xl="6"
                lg="12"
                className="d-flex flex-column justify-content-between border-container-lg"
              >
                <div className="d-flex justify-content-start">
                  <div className="d-flex flex-column ml-0">
                    <div className="user-info mb-1">
                      <h1 className="mb-0 text-capitalize">
                        {overview.profileInfo?._doc.name}
                      </h1>
                      <CardText tag="div">
                        {overview.profileInfo?._doc.email}
                      </CardText>
                      <CardText tag="div" className="mt-1">
                        {overview.profileInfo?._doc.role}
                      </CardText>
                    </div>
                  </div>
                </div>
                <div className="border rounded px-2 py-1 mb-1 more-info">
                  <CardText>
                    {overview.profileInfo?._doc.moreInformation}
                  </CardText>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex flex-wrap align-items-center">
                    <Button.Ripple
                      color="primary"
                      onClick={onApproveUserClick}
                      disabled={isApproving || overview.profileInfo?._doc.status == 'active'}
                    >
                      <div className="d-flex align-items-center">
                        {isApproving && (
                          <Spinner size="sm" className="mr-0.5" />
                        )}
                        <span>Approve</span>
                      </div>
                    </Button.Ripple>

                    <Button.Ripple
                      className="ml-1"
                      color="danger"
                      outline
                      onClick={onRejectUserClick}
                      disabled={isRejecting || overview.profileInfo?._doc.status == 'rejected'}
                    >
                      <div className="d-flex align-items-center">
                        {isRejecting && (
                          <Spinner size="sm" className="mr-0.5" />
                        )}
                        <span>Reject</span>
                      </div>
                    </Button.Ripple>
                  </div>
                  <div>
                    <Button.Ripple
                      color="primary"
                      outline
                      onClick={onEditUserClick}
                    >
                      <div className="d-flex align-items-center">
                        {isApproving && (
                          <Spinner size="sm" className="mr-0.5" />
                        )}
                        <span>Edit</span>
                      </div>
                    </Button.Ripple>
                  </div>
                </div>
              </Col>
              <Col xl="6" lg="12" className="mt-2 mt-xl-0">
                <div className="user-info-wrapper">
                  <Row>
                    <Col xl="6" lg="12">

                      <div className="my-50">
                        <Description
                          label="Country"
                          value={_.get(
                            COUNTRIES.find(
                              (it) => it.code == overview.profileInfo?._doc.country,
                            ),
                            'name',
                            '',
                          )}
                          icon={<Flag className="mr-1" size={14} />}
                        />
                      </div>
                      <div className="my-50">
                        <Description
                          label="Contact"
                          value={overview.profileInfo?._doc.contact}
                          icon={<Phone className="mr-1" size={14} />}
                        />
                      </div>
                      <div className="my-50">
                        <Description
                          label="Company Name"
                          value={overview.profileInfo?._doc.companyName}
                          icon={<Server className="mr-1" size={14} />}
                        />
                      </div>
                      <div className="my-50">
                        <Description
                          label="Application"
                          value={overview.profileInfo?._doc.application}
                          icon={<Grid className="mr-1" size={14} />}
                        />
                      </div>
                      <div className="my-50">
                        <Description
                          label="Website"
                          value={overview.profileInfo?._doc.website}
                          icon={<Globe className="mr-1" size={14} />}
                        />
                      </div>
                    </Col>
                    <Col xl="6" lg="12">
                      <div className="my-50">
                        <Description
                          label="Publisher key"
                          value={overview.profileInfo?._doc.publisherKey}
                          icon={<Key className="mr-1" size={14} />}
                        />
                      </div>
                      <div className="my-50">
                        <Description
                          label="Earnings"
                          value={overview.profileInfo?._doc.earnings}
                          icon={<FileText className="mr-1" size={14} />}
                        />
                      </div>
                      <div className="my-50">
                        <Description
                          label="Payout currency"
                          value={overview.profileInfo?._doc.payoutCurrency}
                          icon={<DollarSign className="mr-1" size={14} />}
                        />
                      </div>
                      <div className="my-50">
                        <Description
                          label="Instant messenger"
                          value={overview.profileInfo?._doc.instantMessenger}
                          icon={<MessageCircle className="mr-1" size={14} />}
                        />
                      </div>

                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Row className="pb-50">
              <Col
                sm={{ size: 6, order: 1 }}
                xs={{ order: 2 }}
                className="d-flex justify-content-around flex-column mt-lg-0 mt-2"
              >
                <div className="session-info mb-1 mb-lg-0">
                  <h2 className="font-weight-bold mb-25">
                    Profile Information
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
                        <h4 className="font-weight-bolder mb-0">
                          {overview.profileInfo?._doc.earnings}
                        </h4>
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
                        <h4 className="font-weight-bolder mb-0">
                          {overview.profileInfo?._doc.payments}
                        </h4>
                        <CardText className="font-small-3 mb-0">
                          Payments
                        </CardText>
                      </Media>
                    </Media>
                  </Col>
                </Row>
              </Col>
              <Col
                sm={{ size: 6, order: 2 }}
                xs={{ order: 1 }}
                className="d-flex justify-content-end flex-column text-right"
              >
                <div className="d-flex align-items-center align-self-end ">
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
                <div className="mt-1">
                  {!installs.isInstallLoading ? (
                    <Chart
                      options={options}
                      series={installs.installCount}
                      type="bar"
                      height={200}
                    />
                  ) : (
                    <Spinner className="spinner" />
                  )}
                </div>
              </Col>
            </Row>
            <hr />
            <Row className="pt-50">
              <Col className="mb-2" md="6" sm="12">
                <p className="mb-50">
                  Installs{' '}
                  {(overview.profileInfo?.installsRate * 100).toFixed(2)}(%)
                </p>
                <Progress
                  className="avg-session-progress mt-25"
                  value={`${overview.profileInfo?.installsRate * 100}`}
                />
              </Col>
              <Col className="mb-2" md="6" sm="12">
                <p className="mb-50">
                  Uninstalls{' '}
                  {(overview.profileInfo?.uninstallsRate * 100).toFixed(2)}(%)
                </p>
                <Progress
                  className="avg-session-progress progress-bar-warning mt-25"
                  value={`${overview.profileInfo?.uninstallsRate * 100}`}
                />
              </Col>
              <Col md="6" sm="12">
                <p className="mb-50">
                  Live {(overview.profileInfo?.liveRate * 100).toFixed(2)}(%)
                </p>
                <Progress
                  className="avg-session-progress progress-bar-danger mt-25"
                  value={`${overview.profileInfo?.liveRate * 100}`}
                />
              </Col>
              <Col md="6" sm="12">
                <p className="mb-50">
                  Live Time{' '}
                  {(overview.profileInfo?.liveTimeRate * 100).toFixed(2)}(%)
                </p>
                <Progress
                  className="avg-session-progress progress-bar-success mt-25"
                  value={`${overview.profileInfo?.liveTimeRate * 100}`}
                />
              </Col>
            </Row>
          </CardBody>
        </Card>
        <Sidebar
          open={sidebarOpen}
          toggleSidebar={() => {
            setSidebarOpen(!sidebarOpen)
          }}
          user={overview.profileInfo}
        />
      </>
    )
  return (
    <div className="table-loader-container">
      <Spinner className="spinner" />
    </div>
  )
}

export default Overview
