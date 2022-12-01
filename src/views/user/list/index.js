import { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, Redirect, useHistory } from 'react-router-dom'
import { Row, Col, Card, CardBody } from 'reactstrap'

import { User } from 'react-feather'
import Avatar from '@components/avatar'
import UsersTable from './partial/Table'
import { useSearchParams } from '@src/navigation'
import { getUsers } from '../store/action'
import { SidebarCtx, SidebarProvider } from './partial/sidebarContext'

const sortKey = ['email', 'name', 'companyName', 'status']
const UserList = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const location = useLocation()
  const dispatch = useDispatch()
  const history = useHistory()
  const store = useSelector((state) => state.user)
  const [role, setRole] = useState('')
  useEffect(() => {
    const fetchData = () => {
      const limit = parseInt(searchParams.get('limit'))
      const page = parseInt(searchParams.get('page'))
      const query = {
        limit,
        page,
        filter: {},
      }
      if (searchParams.get('status')) {
        query.filter['status'] = searchParams.get('status')
      }
      if (searchParams.get('role')) {
        query.filter['role'] = searchParams.get('role')
      }
      if (searchParams.get('search')) {
        query.filter['search'] = searchParams.get('search')
      }
      sortKey.forEach((key) => {
        if (searchParams.get(key)) {
          query.filter[key] = searchParams.get(key)
        }
      })
      try {
        if (location.pathname == '/admin/list') {
          setRole('admin')
          dispatch(
            getUsers({ ...query, filter: { ...query.filter, role: 'admin' } }),
          )
        } else if (location.pathname == '/publisher/list') {
          setRole('publisher')
          dispatch(
            getUsers({
              ...query,
              filter: { ...query.filter, role: 'publisher' },
            }),
          )
        }
      } catch (error) {
        history.push('/not-authorized')
      }
    }
    fetchData()
  }, [dispatch, searchParams.toString()])

  if (searchParams.get('limit') === null || searchParams.get('page') === null) {
    searchParams.set('limit', 10)
    searchParams.set('page', 1)
    return <Redirect to={`${location.pathname}?${searchParams.toString()}`} />
  }

  if (searchParams.get('limit') === null || searchParams.get('page') === null) {
    return null
  } else {
    return (
      <Fragment>
        <Row>
          <Col sm={12} md={6} lg={3}>
            <Card className="card-congratulations-medal">
              <CardBody>
                <div className="d-flex justify-content-between align-items-end">
                  <h3 className="fw-bolder mb-75">{store.total}</h3>
                  <p className="card-text ">Total {role}s</p>
                  <Avatar color="light-primary" size="lg" icon={<User />} />
                </div>
              </CardBody>
            </Card>
          </Col>
          {/* <Col>
            <Card className="card-congratulations-medal">
              <CardBody>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h3 className="fw-bolder mb-75">21,459</h3>
                    <p className="card-text">Admin Users</p>
                  </div>
                  <Avatar
                    color="light-success"
                    size="lg"
                    icon={<UserCheck />}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col>
            <Card className="card-congratulations-medal">
              <CardBody>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h3 className="fw-bolder mb-75">21,459</h3>
                    <p className="card-text">Publishers</p>
                  </div>
                  <Avatar
                    color="light-warning"
                    size="lg"
                    icon={<UserMinus />}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col>
            <Card className="card-congratulations-medal">
              <CardBody>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h3 className="fw-bolder mb-75">21,459</h3>
                    <p className="card-text">Pending Users</p>
                  </div>
                  <Avatar
                    color="light-danger"
                    size="lg"
                    icon={<UserX />}
                  />
                </div>
              </CardBody>
            </Card>
          </Col> */}
        </Row>
        <Row>
          {/* <Col>
            <Filter />
          </Col> */}
        </Row>
        <SidebarProvider>
          <UsersTable users={store} role={role} />
        </SidebarProvider>
      </Fragment>
    )
  }
}

export default UserList
