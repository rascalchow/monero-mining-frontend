import React, { Fragment, useState, useEffect } from 'react'
import ProfileInfoCard from './partials/ProfileInfoCard'
import '@styles/react/pages/page-profile.scss'
import { useSelector } from 'react-redux'
import {
  useParams,
  NavLink as RouterNavLink,
  Link,
} from 'react-router-dom'
import { ProfileInfoContextProvider } from './partials/profileInfoContext'
import { Row, Col, Card, Button, CardBody } from 'reactstrap'
import { Nav, NavLink, NavItem, TabContent, TabPane } from 'reactstrap'
import { PROFILE_TAB_ROUTES } from './partials/profileInfoContext'
import EditProduct from '../../product/edit'
import LiveTime from './partials/LiveTime'
const Profile = () => {
  const [block, setBlock] = useState(false)
  const { id } = useParams()
  const [activeTab, setActiveTab] = useState('1')
  const toggleTab = (tab) => {
    setActiveTab(tab)
  }
  const handleBlock = () => {
    setBlock(true)
    setTimeout(() => {
      setBlock(false)
    }, 2000)
  }

  return (
    <ProfileInfoContextProvider>
      <div id="user-profile">
        <section id="profile-info">
          <Card className="profile-header mb-2 ">
            <Nav className="nav-left mb-0" pills>
              {PROFILE_TAB_ROUTES.map((item, index) => {
                return (
                  <NavItem key={index}>
                    <NavLink
                      active={activeTab == `${index + 1}`}
                      tag={Link}
                      to={`/publisher/${id}/${item.route}`}
                      onClick={() => toggleTab(`${index + 1}`)}
                    >
                      {item.title}
                    </NavLink>
                  </NavItem>
                )
              })}
            </Nav>
          </Card>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <Row>
                <Col sm="12">
                  <ProfileInfoCard />
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <Row>
                <Col sm="12">
                  <EditProduct />
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="3">
              <Row>
                <Col sm="12">
                 <LiveTime/>
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        </section>
      </div>
    </ProfileInfoContextProvider>
  )
}

export default Profile
