import { useEffect, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardBody, Button, Row, Col } from 'reactstrap'
import Description from '@components/description'
import { Spinner } from 'reactstrap'
import _ from 'lodash'
import { API_URL } from '../../constants'

import { COUNTRIES } from '../../constants'
import Sidebar from './partials/Sidebar'
import { SidebarCtx } from '@context/user/sidebarContext'
import { Inbox, Key, UserCheck } from 'react-feather'
import useProfile from '@hooks/useProfile'

const About = () => {
  const { load: loadProfile, profile, loading } = useProfile();
  useEffect(() => {
    loadProfile();
  }, [])
  const { sidebarOpen, setSidebarOpen } = useContext(SidebarCtx)
  const onEditUserClick = () => {
    setSidebarOpen(true)
  }
  const disp = loading || [
    { label: 'Full Name', value: profile.name, icon: <UserCheck size={15} /> },
    { label: 'Email', value: profile.email, icon: <Inbox size={15} /> },
    { label: 'Publiser Key', value: profile.publisherKey, icon: <Key size={15} /> },
    { label: 'Company Name', value: profile.companyName, icon: <UserCheck size={15} /> },
    { label: 'Website/Application', value: profile.application, icon: <UserCheck size={15} /> },
    { label: 'Contact Person', value: profile.contact, icon: <UserCheck size={15} /> },
    {
      label: 'Country',
      value: _.get(
        COUNTRIES.find((it) => it.code === profile.country),
        'name',
      ), icon: <UserCheck size={15} />
    },
    { label: 'Phone', value: profile.phone, icon: <UserCheck size={15} /> },
    { label: 'Website URL', value: profile.website, icon: <UserCheck size={15} /> },
  ]
  return (
    <>
      <Card>
        <CardBody>
          {loading ? (
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
              <div className="mb-4"></div>
              <span>More Information: </span>
              <p>{profile.moreInformation}</p>

              {profile.installer && (
                <>
                  <div>Sortware download link</div>
                  <a
                    href={`${API_URL}/${profile.publisherKey}/install.msi`}
                    download
                  >
                    Download product setup file
                  </a>
                  <br />
                </>
              )}

              {profile.role == 'publisher' && (
                <>
                  <Button.Ripple
                    className="mt-4"
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
        user={profile}
      />
    </>
  )
}

export default About
