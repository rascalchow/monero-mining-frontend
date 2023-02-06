// ** React Imports
import { useEffect, useState, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// ** Custom Components
import Avatar from '@components/avatar'
import { TrendingUp, User, Box, DollarSign, FolderPlus, FolderMinus, Tv, Cast, Percent, UserCheck, CreditCard } from 'react-feather'
import { Link } from 'react-router-dom'
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
import { approveUser, rejectUser } from './store/action'
import { COUNTRIES } from '@src/constants.js'
import './style.scss'
import { useProfileInfoCtx } from '../../../utility/context/user/profileInfoContext'
import { DURATION } from '@const/user'
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

const PublisherHome = () => {
  // const {overview} = useProfileInfoCtx()
  const [isApproving, setIsApproving] = useState(false)
  const [isRejecting, setIsRejecting] = useState(false)
  const [duration, setDuration] = useState(DURATION)
  const dispatch = useDispatch()
  const { appUsers } = useProfileInfoCtx()

  useEffect(() => {
    appUsers.loadAppStats();
  }, [])
  return (
    <>
      <Row>
        <Col sm={12} md={6} lg={3}>
          <Link to={'/installs'}>
            <Card className="card-congratulations-medal">
              <CardBody>
                <div className="d-flex justify-content-between align-items-end">
                  <h3 className="fw-bolder mb-75">
                    {appUsers?.appStatsLoading ? (
                      <Spinner
                        className="spinner "
                        variant="primary"
                        style={{ color: '#7367F0' }}
                      />
                    ) : (
                      <div className="text-primary">
                        {appUsers.appStatsInfo?.installs}
                      </div>
                    )}
                  </h3>
                  <p className="card-text mb-75">Installs</p>
                  <Avatar color="light-primary" size="lg" icon={<FolderPlus />} />
                </div>
              </CardBody>
            </Card></Link>
        </Col>
        <Col sm={12} md={6} lg={3}>
          <Link to={'/install'}>
            <Card className="card-congratulations-medal">
              <CardBody>
                <div className="d-flex justify-content-between align-items-end">
                  <h3 className="fw-bolder mb-75">
                    {appUsers?.appStatsLoading ? (
                      <Spinner
                        className="spinner "
                        variant="primary"
                        style={{ color: '#7367F0' }}
                      />
                    ) : (
                      <div className="text-primary">
                        {appUsers.appStatsInfo?.uninstalls}
                      </div>
                    )}
                  </h3>
                  <p className="card-text mb-75">Uninstalls</p>
                  <Avatar color="light-primary" size="lg" icon={<FolderMinus />} />
                </div>
              </CardBody>
            </Card></Link>
        </Col>
        <Col sm={12} md={6}>
          <Link to={'/install'}>
            <Card className="card-congratulations-medal">
              <CardBody>
                <div className="d-flex justify-content-between align-items-end">
                  <h3 className="fw-bolder mb-75">
                    {appUsers?.appStatsLoading ? (
                      <Spinner
                        className="spinner "
                        variant="primary"
                        style={{ color: '#7367F0' }}
                      />
                    ) : (
                      <div className="text-primary">
                        {(appUsers.appStatsInfo?.installs > 0 ? (appUsers.appStatsInfo?.installs - appUsers.appStatsInfo?.uninstalls) / appUsers.appStatsInfo?.installs : 0).toFixed(2) + '%'}
                      </div>
                    )}
                  </h3>
                  <p className="card-text mb-75">Retention Rate</p>
                  <Avatar color="light-primary" size="lg" icon={<TrendingUp />} />
                </div>
              </CardBody>
            </Card>
          </Link>
        </Col>
        <Col sm={12} md={6} lg={3}>

          <Link to={'/live-time'}>
            <Card className="card-congratulations-medal">
              <CardBody>
                <div className="d-flex justify-content-between align-items-end">
                  <h3 className="fw-bolder mb-75">
                    {appUsers?.appStatsLoading ? (
                      <Spinner
                        className="spinner "
                        variant="primary"
                        style={{ color: '#7367F0' }}
                      />
                    ) : (
                      <div className="text-primary">
                        {appUsers.appStatsInfo?.live}
                      </div>
                    )}
                  </h3>
                  <p className="card-text mb-75">Live </p>
                  <Avatar color="light-primary" size="lg" icon={<Tv />} />
                </div>
              </CardBody>
            </Card> </Link>
        </Col>
        <Col sm={12} md={6} lg={3}>
          <Link to={'/live-time'}>
            <Card className="card-congratulations-medal">
              <CardBody>
                <div className="d-flex justify-content-between align-items-end">
                  <h3 className="fw-bolder mb-75">
                    {appUsers?.appStatsLoading ? (
                      <Spinner
                        className="spinner "
                        variant="primary"
                        style={{ color: '#7367F0' }}
                      />
                    ) : (
                      <div className="text-primary">
                        {appUsers.appStatsInfo?.liveTime}
                      </div>
                    )}
                  </h3>
                  <p className="card-text mb-75">Live Time</p>
                  <Avatar color="light-primary" size="lg" icon={<Cast />} />
                </div>
              </CardBody>
            </Card> </Link>
        </Col>
        <Col sm={12} md={6}>
          <Card className="card-congratulations-medal">
            <CardBody>
              <div className="d-flex justify-content-between align-items-end">
                <h3 className="fw-bolder mb-75">
                  {appUsers?.appStatsLoading ? (
                    <Spinner
                      className="spinner "
                      variant="primary"
                      style={{ color: '#7367F0' }}
                    />
                  ) : (
                    <div className="text-primary">
                      {(appUsers.appStatsInfo?.installs > 0 ? (appUsers.appStatsInfo?.live / appUsers.appStatsInfo?.installs) : 0).toFixed(2) + '%'}
                    </div>
                  )}
                </h3>
                <p className="card-text mb-75">Success Rate</p>
                <Avatar color="light-primary" size="lg" icon={<Percent />} />
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col sm={12} md={6}>

          <Link to={'/affiliate'}>
            <Card className="card-congratulations-medal">
              <CardBody>
                <div className="d-flex justify-content-between align-items-end">
                  <h3 className="fw-bolder mb-75">
                    {appUsers?.appStatsLoading ? (
                      <Spinner
                        className="spinner "
                        variant="primary"
                        style={{ color: '#7367F0' }}
                      />
                    ) : (
                      <div className="text-primary">
                        {appUsers.appStatsInfo?.referrals}
                      </div>
                    )}
                  </h3>
                  <p className="card-text mb-75">Referrals </p>
                  <Avatar color="light-primary" size="lg" icon={<UserCheck />} />
                </div>
              </CardBody>
            </Card></Link>
        </Col>
        <Col sm={12} md={6} lg={3}>
          <Link to={'/earnings'}>
            <Card className="card-congratulations-medal">
              <CardBody>
                <div className="d-flex justify-content-between align-items-end">
                  <h3 className="fw-bolder mb-75">
                    {appUsers?.appStatsLoading ? (
                      <Spinner
                        className="spinner "
                        variant="primary"
                        style={{ color: '#7367F0' }}
                      />
                    ) : (
                      <div className="text-primary">
                        {appUsers.appStatsInfo?.earnings}
                      </div>
                    )}
                  </h3>
                  <p className="card-text mb-75">Today’s Earnings </p>
                  <Avatar color="light-primary" size="lg" icon={<DollarSign />} />
                </div>
              </CardBody>
            </Card></Link>
        </Col>
        <Col sm={12} md={6} lg={3}>
          <Link to={'/payment'}>
            <Card className="card-congratulations-medal">
              <CardBody>
                <div className="d-flex justify-content-between align-items-end">
                  <h3 className="fw-bolder mb-75">
                    {appUsers?.appStatsLoading ? (
                      <Spinner
                        className="spinner "
                        variant="primary"
                        style={{ color: '#7367F0' }}
                      />
                    ) : (
                      <div className="text-primary">
                        {appUsers.appStatsInfo?.lastPayment}
                      </div>
                    )}
                  </h3>
                  <p className="card-text mb-75">Last Payout </p>
                  <Avatar color="light-primary" size="lg" icon={<CreditCard />} />
                </div>
              </CardBody>
            </Card></Link>
        </Col>
      </Row>

    </>
  )
}

export default PublisherHome
