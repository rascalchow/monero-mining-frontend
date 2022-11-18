import { Row, Col, Container } from 'reactstrap'

import WelcomeCard from './welcome-card'
import StatsCard from './stats-card'

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
    </Container>
  )
}

export default PublisherHome
