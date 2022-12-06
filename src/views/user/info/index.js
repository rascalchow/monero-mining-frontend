import React, { Fragment, useState, useEffect } from 'react'
import ProfileInfoCard from './partials/ProfileInfoCard'
import '@styles/react/pages/page-profile.scss'
import {
  useParams,
  NavLink as RouterNavLink,
  Link,
  Switch,
  Route,
  useRouteMatch,
  useLocation
} from 'react-router-dom'
import { ProfileInfoContextProvider } from './partials/profileInfoContext'
import { Row, Col, Card, Button, CardBody } from 'reactstrap'
import { Nav, NavLink, NavItem, TabContent, TabPane } from 'reactstrap'
import { PROFILE_TAB_ROUTES } from '@const/user'
import EditProduct from '../../product/edit'
import LiveTime from './partials/LiveTime'
import AppUsers from './partials/AppUsers'
const Profile = () => {
  const [block, setBlock] = useState(false)
  const { id } = useParams()
  const {path} = useRouteMatch()
  const {pathname} = useLocation()
  const handleBlock = () => {
    setBlock(true)
    setTimeout(() => {
      setBlock(false)
    }, 2000)
  }
  const getEndpoint=(pathname)=>{
    let toArr = pathname.split('/')
    return toArr[toArr.length-1]==id?'':toArr[toArr.length-1]
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
                      active={getEndpoint(pathname)== `${item.route}`}
                      tag={Link}
                      to={`/publisher/${id}/${item.route}`}
                    >
                      {item.title}
                    </NavLink>
                  </NavItem>
                )
              })}
            </Nav>
          </Card>
          <Switch>
            <Route path={`${path}`} index exact component={ProfileInfoCard} />
            <Route path={`${path}/software`} component={EditProduct} />
            <Route path={`${path}/liveTime`} component={LiveTime} />
            <Route path={`${path}/users`} component={AppUsers} />
          </Switch>
        </section>
      </div>
    </ProfileInfoContextProvider>
  )
}

export default Profile
