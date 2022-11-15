// ** React Imports
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

// ** Store & Actions
import { getUser } from '../store/action'
import { useSelector, useDispatch } from 'react-redux'

// ** Reactstrap
import { Row, Col, Alert } from 'reactstrap'

import LoadingSpinner from '@components/spinner/Loading-spinner'

// ** User View Components
import UserInfoCard from './UserInfoCard'
import '@styles/react/apps/app-users.scss'

const UserView = () => {
  // ** Vars
  const store = useSelector((state) => state.user)
  const [error, setError] = useState(0)
  const dispatch = useDispatch()
  const { id } = useParams()

  // ** Get suer on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getUser(id))
      } catch (error) {
        setError(error.status)
      }
    }
    fetchData()
  }, [dispatch])

  if (store.isLoading) {
    return <LoadingSpinner />
  }

  return (
    <>
      {store.selectedUser && (
        <div className="app-user-view">
          <Row>
            <Col xl="6" lg="8" md="12">
              <UserInfoCard />
            </Col>
          </Row>
        </div>
      )}
      {error !== 0 && (
        <Alert color="danger">
          <h4 className="alert-heading">User not found</h4>
          <div className="alert-body">
            User with id: {id} does not exist. Check list of all Users:{' '}
            <Link to="/user/list">Users List</Link>
          </div>
        </Alert>
      )}
    </>
  )
}
export default UserView
