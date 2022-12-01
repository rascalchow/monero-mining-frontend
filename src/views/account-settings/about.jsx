import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardBody } from 'reactstrap'
import { getProfile } from './store/action'
import Description from '@components/description'
import { Spinner } from 'reactstrap'
import _ from 'lodash'
import { API_URL } from '../../constants'

import { COUNTRIES } from '../../constants'

const About = () => {
  const userData = useSelector((state) => state.accountSettings.profile)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProfile())
  }, [])
  const disp = [
    { label: 'Publiser Key', value: userData.publisherKey },
    { label: 'Company Name', value: userData.userProfileId.companyName },
    { label: 'Website/Application', value: userData.userProfileId.application },
    { label: 'Contact Person', value: userData.userProfileId.contact },
    { label: 'Email', value: userData.email },
    {
      label: 'Country',
      value: _.get(
        COUNTRIES.find((it) => it.code === userData.userProfileId.country),
        'name',
      ),
    },
    { label: 'Phone', value: userData.phone },
    { label: 'Website URL', value: userData.userProfileId.website },
  ]
  return (
    <Card>
      <CardBody>
        {userData.isLoading ? (
          <div className="d-flex justify-content-center py-5">
            <Spinner />
          </div>
        ) : (
          <>
            {disp.map((it, i) => (
              <div className="my-50" key={i}>
                <Description label={it.label} value={it.value} />
              </div>
            ))}

            <div>More Information:</div>
            <p>{userData.userProfileId.moreInformation}</p>

            {userData.userProfileId.installer && (
              <>
                <div>Sortware download link</div>
                <a
                  href={`${API_URL}/${userData.publisherKey}/install.msi`}
                  download
                >
                  Download product setup file
                </a>
              </>
            )}
          </>
        )}
      </CardBody>
    </Card>
  )
}

export default About
