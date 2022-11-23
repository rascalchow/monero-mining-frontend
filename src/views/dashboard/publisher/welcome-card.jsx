import Proptypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Card, CardHeader, CardBody, CardTitle, CardText } from 'reactstrap'
import _ from 'lodash'

const WelcomeCard = ({ className }) => {
  const userData = useSelector((state) => state.auth.userData)
  return (
    <Card className={'card ' + className}>
      <CardHeader>
        <CardTitle>Welcome to Nurev 🚀</CardTitle>
      </CardHeader>
      <CardBody>
        <CardText className="text-center">
          Hi {_.get(userData, 'name', '').split(' ')[0]}
          Your publisher key is ${_.get(userData, 'publisherKey', '')}
        </CardText>
      </CardBody>
    </Card>
  )
}

export default WelcomeCard
WelcomeCard.propTypes = {
  className: Proptypes.string.isRequired,
}
