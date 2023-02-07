import { useEffect, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardBody, Button, Row, Col } from 'reactstrap'
import { getProfile } from './store/action'
import Description from '@components/description'
import { Spinner } from 'reactstrap'
import _ from 'lodash'
import { API_URL } from '../../constants'

import { COUNTRIES } from '../../constants'
import Sidebar from './partials/Sidebar'
import { SidebarCtx } from '@context/user/sidebarContext'
import { Inbox, Key, UserCheck } from 'react-feather'

const About = () => {
  const userData = useSelector((state) => state.accountSettings.profile)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProfile())
  }, [])
  const { sidebarOpen, setSidebarOpen } = useContext(SidebarCtx)
  const onEditUserClick = () => {
    setSidebarOpen(true)
  }
  const disp = [
    { label: 'Full Name', value: userData.name, icon: <UserCheck size={15} /> },
    { label: 'Email', value: userData.email, icon: <Inbox size={15} /> },
    { label: 'Publiser Key', value: userData.publisherKey, icon: <Key size={15} /> },
    { label: 'Company Name', value: userData.companyName, icon: <UserCheck size={15} /> },
    { label: 'Website/Application', value: userData.application, icon: <UserCheck size={15} /> },
    { label: 'Contact Person', value: userData.contact, icon: <UserCheck size={15} /> },
    {
      label: 'Country',
      value: _.get(
        COUNTRIES.find((it) => it.code === userData.country),
        'name',
      ), icon: <UserCheck size={15} />
    },
    { label: 'Phone', value: userData.phone, icon: <UserCheck size={15} /> },
    { label: 'Website URL', value: userData.website, icon: <UserCheck size={15} /> },
  ]
  return (
    <>
      <Card>
        <CardBody>
          {userData.isLoading ? (
            <div className="d-flex justify-content-center py-5">
              <Spinner />
            </div>
          ) : (
            <>
              <Row>
                {disp.map((it, i) => (
                  <Col sm={12} md={6} key={i}>
                    <Description label={it.label} value={it.value} />
                  </Col>
                ))}
              </Row>

              <p>{userData.moreInformation}</p>

              {userData.installer && (
                <>
                  <div>Sortware download link</div>
                  <a
                    href={`${API_URL}/${userData.publisherKey}/install.msi`}
                    download
                  >
                    Download product setup file
                  </a>
                </>
              )}

              {userData.role == 'publisher' && (
                <>
                  <Button.Ripple
                    color="primary"
                    outline
                    onClick={onEditUserClick}
                  >
                    <div className="d-flex align-items-center">
                      <span>Edit</span>
                    </div>
                  </Button.Ripple>
                </>
              )}
            </>
          )}
        </CardBody>
      </Card>
      <Sidebar
        open={sidebarOpen}
        toggleSidebar={() => {
          setSidebarOpen(!sidebarOpen)
        }}
        onSave={() => {

        }}
        user={userData}
      />
    </>
  )
}

export default About
