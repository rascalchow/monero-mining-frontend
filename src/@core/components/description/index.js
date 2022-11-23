import { CardText } from 'reactstrap'
import Proptypes from 'prop-types'
const Description = ({ label, value, icon }) => {
  return (
    <div className="d-flex flex-wrap align-items-center">
      <div className="mr-1">
        {icon}
        <span className="font-weight-bold">{label}:</span>
      </div>
      <span className="text-capitalize mb-0">{value}</span>
    </div>
  )
}

Description.propTypes = {
  label: Proptypes.string,
  value: Proptypes.string,
  icon: Proptypes.node,
}

export default Description
