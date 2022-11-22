import { Button, Spinner } from 'reactstrap'
import Proptypes from 'prop-types'
const SubmitButton = ({ isSubmitting, children }) => {
  return (
    <Button.Ripple color="primary" type="submit">
      <div className="d-flex aiign-items-cente">
        {isSubmitting && (
          <>
            <Spinner size="sm" />
            &nbsp;{' '}
          </>
        )}
        {children}
      </div>
    </Button.Ripple>
  )
}
export default SubmitButton

SubmitButton.propTypes = {
  isSubmitting: Proptypes.bool,
  children: Proptypes.any,
}
