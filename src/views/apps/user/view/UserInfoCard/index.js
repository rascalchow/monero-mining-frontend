// ** React Imports
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import { Card, CardBody, CardText, Button, Row, Col, Spinner } from 'reactstrap'
import { Flag, Phone, Grid, Server, Voicemail, Globe } from 'react-feather'
import _ from 'lodash'

import InfoListItem from './InfoListItem'

import { approveUser, rejectUser } from '../../store/action'
import { COUTRIES } from '@src/constants.js'
import './style.scss'

const UserInfoCard = () => {
  const selectedUser = useSelector((state) => state.user.selectedUser)
  const [isApproving, setIsApproving] = useState(false)
  const [isRejecting, setIsRejecting] = useState(false)

  const dispatch = useDispatch()

  // ** render user img
  const renderUserImg = () => {
    if (selectedUser !== null && selectedUser.avatar) {
      return (
        <img
          src={selectedUser.avatar}
          alt="user-avatar"
          className="img-fluid rounded"
          height="104"
          width="104"
        />
      )
    } else {
      const stateNum = Math.floor(Math.random() * 6),
        states = [
          'light-success',
          'light-danger',
          'light-warning',
          'light-info',
          'light-primary',
          'light-secondary',
        ],
        color = states[stateNum]
      return (
        <Avatar
          initials
          color={color}
          className="rounded"
          content={selectedUser.name}
          contentStyles={{
            borderRadius: 0,
            fontSize: 'calc(36px)',
            width: '100%',
            height: '100%',
          }}
          style={{
            height: '90px',
            width: '90px',
          }}
        />
      )
    }
  }

  const onApproveUserClick = async () => {
    try {
      setIsApproving(true)
      await dispatch(approveUser(selectedUser._id))
      setIsApproving(false)
    } catch (error) {
      setIsApproving(false)
    }
  }

  const onRejectUserClick = async () => {
    try {
      setIsRejecting(true)
      await dispatch(rejectUser(selectedUser._id))
      setIsRejecting(false)
    } catch (error) {
      setIsRejecting(false)
    }
  }

  return (
    <Card className="main-info-card">
      <CardBody>
        <Row>
          <Col
            xl="6"
            lg="12"
            className="d-flex flex-column justify-content-between border-container-lg"
          >
            <div className="user-avatar-section">
              <div className="d-flex justify-content-start">
                {renderUserImg()}
                <div className="d-flex flex-column ml-1">
                  <div className="user-info mb-1">
                    <h1 className="mb-0 text-capitalize">
                      {selectedUser.name}
                    </h1>
                    <CardText tag="div">{selectedUser.email}</CardText>
                    <CardText tag="div" className="mt-1">
                      {selectedUser.role}
                    </CardText>
                  </div>
                </div>
              </div>
            </div>
            <div className="border rounded px-2 py-1 mb-1 more-info">
              <CardText>{selectedUser.userProfileId.moreInformation}</CardText>
            </div>
            <div className="d-flex flex-wrap align-items-center">
              <Button.Ripple
                color="primary"
                onClick={onApproveUserClick}
                disabled={isApproving || selectedUser.status === 'active'}
              >
                <div className="d-flex align-items-center">
                  {isApproving && <Spinner size="sm" className="mr-0.5" />}
                  <span>Approve</span>
                </div>
              </Button.Ripple>

              <Button.Ripple
                className="ml-1"
                color="danger"
                outline
                onClick={onRejectUserClick}
                disabled={isRejecting || selectedUser.status === 'rejected'}
              >
                <div className="d-flex align-items-center">
                  {isRejecting && <Spinner size="sm" className="mr-0.5" />}
                  <span>Reject</span>
                </div>
              </Button.Ripple>
            </div>
          </Col>
          <Col xl="6" lg="12" className="mt-2 mt-xl-0">
            <div className="user-info-wrapper">
              <div className="my-50">
                <InfoListItem
                  label="Country"
                  value={_.get(
                    COUTRIES.find(
                      (it) => it.code == selectedUser.userProfileId.country,
                    ),
                    'name',
                  )}
                  icon={<Flag className="mr-1" size={14} />}
                />
              </div>
              <div className="my-50">
                <InfoListItem
                  label="Contact"
                  value={selectedUser.userProfileId.contact}
                  icon={<Phone className="mr-1" size={14} />}
                />
              </div>
              <div className="my-50">
                <InfoListItem
                  label="Company Name"
                  value={selectedUser.userProfileId.companyName}
                  icon={<Server className="mr-1" size={14} />}
                />
              </div>
              <div className="my-50">
                <InfoListItem
                  label="Application"
                  value={selectedUser.userProfileId.application}
                  icon={<Grid className="mr-1" size={14} />}
                />
              </div>
              <div className="my-50">
                <InfoListItem
                  label="I.M."
                  value={selectedUser.userProfileId.instantMessenger}
                  icon={<Voicemail className="mr-1" size={14} />}
                />
              </div>
              <div className="my-50">
                <InfoListItem
                  label="website."
                  value={selectedUser.userProfileId.website}
                  icon={<Globe className="mr-1" size={14} />}
                />
              </div>
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

export default UserInfoCard
