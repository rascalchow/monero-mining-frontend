import { Fragment } from 'react';
import {
  useLocation,
  Redirect
} from 'react-router-dom'
import {
  Row,
  Col,
  Card,
  CardBody,
} from 'reactstrap'

import {
  User,
  UserCheck,
  UserMinus,
  UserX,
} from 'react-feather'

import Avatar from '@components/avatar'

import UsersTable from "./Table";
import { useSearchParams } from '@src/navigation';

const UserList = () => {
  const [searchParams] = useSearchParams()
  const location = useLocation()
  if (searchParams.get('limit') === null || searchParams.get('page') === null) {
    searchParams.set('limit', 10)
    searchParams.set('page', 1)
    
    return <Redirect to={`${location.pathname}?${searchParams.toString()}`} />
  }  
  
  if (searchParams.get('limit') === null || searchParams.get('page') === null) {
    return null
  } else {
    return(
      <Fragment>
        <Row>
          <Col>
            <Card className="card-congratulations-medal">
              <CardBody>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h3 className="fw-bolder mb-75">21,459</h3>
                    <p className="card-text">Total Users</p>
                  </div>
                  <Avatar
                    color="light-primary"
                    size="lg"
                    icon={<User />}
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
          </Col>
        </Row>
        <UsersTable />
      </Fragment>
    ) 
  }
  
}

export default UserList
