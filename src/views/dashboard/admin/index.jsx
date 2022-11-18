import { useSelector } from 'react-redux'
import { Card, CardHeader, CardBody, CardTitle, CardText } from 'reactstrap'

import _ from 'lodash'

const AdminHome = () => {
  const userData = useSelector((state) => state.auth.userData)
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>
            <h2 className="text-capitalize">
              Hi {_.get(userData, 'name', '').split(' ')[0]}
            </h2>
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

export default AdminHome
