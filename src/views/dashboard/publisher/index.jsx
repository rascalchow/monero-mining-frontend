import { Row, Col, Container } from 'reactstrap'
import WelcomeCard from './welcome-card'
import StatsCard from './stats-card'
import DeviceListCard from './device-list-card'

const PublisherHome = () => {
  return (
    <Container fluid className="px-0">
      <Row>
        <Col md={12} lg={4}>
          <WelcomeCard className="h-100" />
        </Col>
        <Col md={12} lg={8}>
          <StatsCard className="h-100" />
        </Col>
      </Row>
      <Row className="my-2">
        <Col>
          <DeviceListCard />
        </Col>
      </Row>
    </Container>
  )
}

export default PublisherHome
