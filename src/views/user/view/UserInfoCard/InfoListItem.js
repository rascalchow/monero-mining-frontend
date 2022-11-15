import { CardText } from 'reactstrap'
import Proptypes from 'prop-types'
const InfoListItem = ({ label, value, icon }) => {
  return (
    <div className="d-flex flex-wrap align-items-center">
      <div className="user-info-title">
        {icon}
        <CardText
          tag="span"
          className="user-info-title font-weight-bold mb-0 text-capitalize"
        >
          {label}
        </CardText>
      </div>
      <CardText className="text-capitalize mb-0">{value}</CardText>
    </div>
  )
}

InfoListItem.propTypes = {
  label: Proptypes.string.isRequired,
  value: Proptypes.string.isRequired,
  icon: Proptypes.node.isRequired,
}

export default InfoListItem
