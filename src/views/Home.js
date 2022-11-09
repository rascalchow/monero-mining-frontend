import { useSelector } from 'react-redux'
import { Card, CardHeader, CardBody, CardTitle, CardText } from 'reactstrap'
import LoadingSpinner from '@components/spinner/Loading-spinner'

import _ from 'lodash'
const Home = () => {
  const userData = useSelector((state) => state.auth.userData)
  if (userData === null) {
    return <LoadingSpinner />
  }
  console.log(userData)
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>
            <h2 className="text-capitalize">
              Hi {_.get(userData, 'name', '').split(' ')[0]}
            </h2>
            {userData.role === 'publisher' &&
              `Your publisher key
            is ${_.get(userData, 'publisherKey', '')}`}
          </CardTitle>
        </CardHeader>
        <CardBody className="py-5">
          <CardText className="text-center font-large-2">
            Welcome to Nurev 🚀
          </CardText>
        </CardBody>
      </Card>
    </div>
  )
}

export default Home
