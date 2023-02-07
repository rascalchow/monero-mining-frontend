import { Fragment, useState, useEffect } from 'react'
import { useSkin } from '@hooks/useSkin'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { handleRegister } from '@store/actions/auth'
import { Link, Redirect, useLocation, useParams } from 'react-router-dom'
import InputPasswordToggle from '@components/input-password-toggle'
import { Facebook, Twitter, Mail, GitHub, Loader } from 'react-feather'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
//** reactstrap */
import {
  Row,
  Col,
  CardTitle,
  CardText,
  FormGroup,
  Button,
  Form,
  Input,
  CustomInput,
  Label,
  Alert,
} from 'reactstrap'

import AppCollapse from '@components/app-collapse'
import ReactSelect from 'react-select'

import _ from 'lodash'

import { selectThemeColors, processReferredQuery } from '@utils'
import FormField from '@components/form-field'
import logo from '@src/assets/images/logo/nurev_logo.jpeg'
import { COUNTRIES, PHONE_REGEX } from '@src/constants'
import { INVITE_ERRORS } from '../../const/invite'
import useInvite from '@hooks/useInvite'

const ReferrerCollapse = ({ data }) => (
  <AppCollapse data={data} className="p-0" />
)
const Register = () => {
  const [skin] = useSkin()
  const dispatch = useDispatch()
  const [fbMsg, setFbMsg] = useState(null)
  const [term, setTerm] = useState(false)
  const location = useLocation()
  const { checkInvite } = useInvite()
  const [inviteStatus, setStatus] = useState()
  const reg = /referralInvite=/s
  const schema = yup
    .object({
      name: yup.string().required(),
      email: yup.string().required().email(),
      phone: yup
        .string()
        .matches(PHONE_REGEX, 'Not a valid phone number')
        .required(),
      password: yup.string().required(),
      companyName: yup.string().required(),
      application: yup.string().required(),
      contact: yup.string().required(),
      country: yup.object().required(),
      instantMessenger: yup.string().required(),
      website: yup.string().required(),
      moreInformation: yup.string().required(),
      code: yup
        .string()
        .required()
        .min(6, 'Must be exactly 6 charactors')
        .max(6, 'Must be exactly 6 charactors'),
    })
    .required()

  const {
    control,
    handleSubmit,
    setError,
    setValue,
    formState: { isValid, isSubmitting, errors, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      companyName: '',
      application: '',
      contact: '',
      instantMessenger: '',
      website: '',
      moreInformation: '',
      referral: '',
      code: '',
      id: '',
    },
  })

  const illustration =
    skin === 'dark' ? 'register-v2-dark.svg' : 'register-v2.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default

  const Terms = () => {
    return (
      <Fragment>
        I agree to
        <a className="ml-25" href="/" onClick={(e) => e.preventDefault()}>
          privacy policy & terms
        </a>
      </Fragment>
    )
  }
  const referrer = [
    {
      title: 'Referrer Information',
      content: (
        <>
          <div className="mb-2 mt-1 w-full p-0 mr-0 ml-0">
            <FormGroup className="w-full">
              <Label for="referrerName">Name</Label>
              <Input
                disabled
                type="name"
                name="referrerName"
                className="w-full"
                id="referrerName"
                placeholder="John Doe"
                value={inviteStatus?.data?.name}
              />
            </FormGroup>
          </div>
          <div className="d-flex  ">
            <FormGroup className="mr-1">
              <Label for="referrerEmail">Email</Label>
              <Input
                disabled
                type="email"
                name="referrerEmail"
                id="referrerEmail"
                placeholder="johndoe@nurev.com"
                value={inviteStatus?.data?.email}
              />
            </FormGroup>
            <FormGroup className="ml-1">
              <Label for="referrerPhone">Phone</Label>
              <Input
                disabled
                name="referrerPhone"
                id="referrerPhone"
                placeholder="+1234567890"
                value={inviteStatus?.data?.phone}
              />
            </FormGroup>
          </div>
          <div>
            <FormGroup className="m-0">
              <Label for="referrerCompany">Company Name</Label>
              <Input
                disabled
                name="referrerCompany"
                id="referrerCompany"
                placeholder="Nurev"
                value={inviteStatus?.data?.companyName}
              />
            </FormGroup>
          </div>
          <div className="mt-1">
            <FormGroup className="m-0">
              <Label for="referrerApplication">Application</Label>
              <Input
                disabled
                name="referrerApplication"
                id="referrerApplication"
                placeholder="Nurev"
                value={inviteStatus?.data?.application}
              />
            </FormGroup>
          </div>
          <div className="d-flex  ">
            <FormGroup className="mr-1">
              <Label for="referrerContact">Contact</Label>
              <Input
                disabled
                type="email"
                name="referrerContact"
                id="referrerContact"
                placeholder=""
                value={inviteStatus?.data?.contact}
              />
            </FormGroup>
            <FormGroup className="ml-1">
              <Label for="referrerPhone">Country</Label>
              <Input
                disabled
                name="referrerPhone"
                id="referrerPhone"
                placeholder=""
                value={
                  COUNTRIES.find((it) => it.code == inviteStatus?.data?.country)
                    ?.name
                }
              />
            </FormGroup>
          </div>
          <div className="d-flex  ">
            <FormGroup className="mr-1">
              <Label for="referrerIM">Instant Messenger</Label>
              <Input
                disabled
                name="referrerIM"
                id="referrerIM"
                placeholder=""
                value={inviteStatus?.data?.instantMessenger}
              />
            </FormGroup>
            <FormGroup className="ml-1">
              <Label for="referrerWebsite">Website</Label>
              <Input
                disabled
                name="referrerWebsite"
                id="referrerWebsite"
                placeholder=""
                value={inviteStatus?.data?.website}
              />
            </FormGroup>
          </div>
          <div className="mb-2">
            <FormGroup>
              <Label for="referrerInfo">More Information</Label>
              <Input
                disabled
                name="referrerInfo"
                id="referrerInfo"
                type="textarea"
                placeholder=""
                value={inviteStatus?.data?.moreInformation}
              />
            </FormGroup>
          </div>
          <hr />
        </>
      ),
    },
  ]
  const onSubmit = async (data) => {
    let query = location?.search
    const id = processReferredQuery(query)
    if (id == null) {
      toast('Invalid Url!', { type: 'error' })
      return
    }
    const formData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
      companyName: data.companyName,
      application: data.application,
      contact: data.contact,
      country: data.country.value,
      instantMessenger: data.instantMessenger,
      website: data.website,
      moreInformation: data.moreInformation,
      referral: data.code,
      id,
    }
    try {
      await dispatch(handleRegister(formData))
      toast('Successful registered a user. Pleas wait until being approved!', {
        type: 'success',
      })
    } catch (error) {
      if (error.status === 422) {
        if (INVITE_ERRORS[error.data.errors.msg]) {
          if (error.data.errors.msg === 'EMAIL_ALREADY_EXISTS') {
            setError('email', {
              type: 'custom',
              message: 'Email is already taken',
            })
          }
          toast(INVITE_ERRORS[error.data.errors.msg], { type: 'error' })
        } else {
          setFbMsg(_.get(error, 'data.errors.msg', 'Server Error'))
        }
      }

      throw error
    }
  }

  useEffect(async () => {
    const id = location.search.substr(1).split('=')[1]
    try {
      const res = await checkInvite(id)
      setStatus({
        success: res.success,
        data: res.data,
      })
    } catch (error) {
      setStatus({
        success: error?.data?.success,
        data: null,
      })
    }
  }, [])

  useEffect(() => {
    if (!!inviteStatus && inviteStatus.success) {
      setValue('email', inviteStatus.data.refereeEmail)
    }
  }, [inviteStatus])

  if (isSubmitSuccessful) {
    return <Redirect to="/login" />
  } else if (location.search === '' || !reg.test(location.search)) {
    return <Redirect to="/misc/not-authorized" />
  }
  return (
    <>
      {inviteStatus?.success == false && <Redirect to="/misc/not-authorized" />}
      {!!inviteStatus && (
        <div className="auth-wrapper auth-v2">
          <Row className="auth-inner m-0">
            <Link
              className="brand-logo"
              to="/"
              onClick={(e) => e.preventDefault()}
            >
              <img src={logo} alt="logo" width="200" />
            </Link>
            <Col
              className="d-none d-lg-flex align-items-start p-5 relative"
              lg="8"
              sm="12"
            >
              <div className="w-100 d-lg-flex align-items-center justify-content-center px-5 absolute">
                <img className="img-fluid " src={source} alt="Login V2" />
              </div>
            </Col>
            <Col
              className="d-flex align-items-center auth-bg px-2 p-lg-5"
              lg="4"
              sm="12"
            >
              <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
                <CardTitle tag="h2" className="font-weight-bold mb-1">
                  You are invited by {inviteStatus?.data?.name} 🚀
                </CardTitle>
                <h3 className="mb-2">Sign Up!</h3>
                <hr className="mb-2" />
                <Alert
                  color="danger"
                  isOpen={!!fbMsg}
                  toggle={() => {
                    setFbMsg(null)
                  }}
                  className="px-3 py-2"
                >
                  Error occured while processing request!
                </Alert>
                <Row>
                  <Col sm="12">
                    <ReferrerCollapse data={referrer} />
                  </Col>
                </Row>
                {/* Referrer Information */}
                <Form className="auth-register-form mt-2"></Form>
                {/* My Information */}
                <Form
                  className="auth-register-form mt-2"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <h5 className="mb-2">Type your information</h5>
                  <Row>
                    <Col>
                      <FormField
                        label="Full Name"
                        name="name"
                        control={control}
                        error={errors.name}
                        render={({ field }) => (
                          <Input
                            autoFocus
                            type="text"
                            placeholder="John Doe"
                            invalid={!!errors.name}
                            {...field}
                          />
                        )}
                      />
                    </Col>
                    <Col>
                      <FormField
                        label="Code"
                        name="code"
                        control={control}
                        error={errors.code}
                        render={({ field }) => (
                          <Input
                            type="text"
                            placeholder=""
                            invalid={!!errors.code}
                            {...field}
                          />
                        )}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormField
                        label="Email"
                        name="email"
                        control={control}
                        error={errors.email}
                        render={({ field }) => (
                          <Input
                            disabled
                            type="email"
                            placeholder="john@example.com"
                            invalid={!!errors.email}
                            value={inviteStatus?.data?.refereeEmail}
                            {...field}
                          />
                        )}
                      />
                    </Col>
                    <Col>
                      <FormField
                        label="Phone"
                        name="phone"
                        control={control}
                        error={errors.phone}
                        render={({ field }) => (
                          <Input
                            type="text"
                            placeholder="(+1)555-5555-5555"
                            invalid={!!errors.phone}
                            {...field}
                          />
                        )}
                      />
                    </Col>
                  </Row>
                  <FormField
                    label="Company Name"
                    name="companyName"
                    control={control}
                    error={errors.companyName}
                    render={({ field }) => (
                      <Input
                        type="text"
                        placeholder="Nurev, LLC"
                        invalid={!!errors.companyName}
                        {...field}
                      />
                    )}
                  />
                  <FormField
                    label="Application"
                    name="application"
                    control={control}
                    error={errors.application}
                    render={({ field }) => (
                      <Input
                        type="text"
                        placeholder="Application"
                        invalid={!!errors.application}
                        {...field}
                      />
                    )}
                  />
                  <Row>
                    <Col>
                      <FormField
                        label="Contact"
                        name="contact"
                        control={control}
                        error={errors.contact}
                        render={({ field }) => (
                          <Input
                            type="text"
                            placeholder="Contact Info"
                            invalid={!!errors.contact}
                            {...field}
                          />
                        )}
                      />
                    </Col>
                    <Col>
                      <FormField
                        label="Coutry"
                        name="country"
                        control={control}
                        error={errors.country}
                        render={({ field }) => (
                          <ReactSelect
                            isClearable={false}
                            theme={selectThemeColors}
                            className={`react-select rounded${!!errors.country && ' border-danger'
                              }`}
                            classNamePrefix="select"
                            options={COUNTRIES.map((it) => ({
                              label: it.name,
                              value: it.code,
                            }))}
                            placeholder="Select Country"
                            {...field}
                          />
                        )}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormField
                        label="Instant Messenger"
                        name="instantMessenger"
                        control={control}
                        error={errors.instantMessenger}
                        render={({ field }) => (
                          <Input
                            type="text"
                            placeholder=""
                            {...field}
                            invalid={!!errors.instantMessenger}
                          />
                        )}
                      />
                    </Col>
                    <Col>
                      <FormField
                        label="Website"
                        name="website"
                        control={control}
                        error={errors.website}
                        render={({ field }) => (
                          <Input
                            type="text"
                            placeholder=""
                            invalid={!!errors.website}
                            {...field}
                          />
                        )}
                      />
                    </Col>
                  </Row>
                  <FormField
                    label="More Information"
                    name="moreInformation"
                    control={control}
                    error={errors.moreInformation}
                    render={({ field }) => (
                      <Input
                        type="textarea"
                        placeholder=""
                        {...field}
                        invalid={!!errors.moreInformation}
                      />
                    )}
                  />
                  <FormField
                    label="Password"
                    name="password"
                    control={control}
                    error={errors.password}
                    render={({ field }) => (
                      <InputPasswordToggle
                        {...field}
                        invalid={!!errors.password}
                        placeholder="Enter password"
                      ></InputPasswordToggle>
                    )}
                  />
                  <FormGroup>
                    <CustomInput
                      type="checkbox"
                      id="terms"
                      name="terms"
                      label={<Terms />}
                      onChange={(e) => {
                        setTerm(e.target.value)
                      }}
                      invalid={!isValid}
                      className="custom-control-Primary"
                      placeholder="Confirm password"
                    />
                  </FormGroup>
                  <Button.Ripple
                    type="submit"
                    block
                    color="primary"
                    disabled={!term}
                  >
                    {isSubmitting ? (
                      <Loader className="spinner" size={18} />
                    ) : (
                      'Sign up'
                    )}
                  </Button.Ripple>
                </Form>
                <p className="text-center mt-2">
                  <span className="mr-25">Already have an account?</span>
                  <Link to="/login">
                    <span>Sign in instead</span>
                  </Link>
                </p>
                <div className="divider my-2">
                  <div className="divider-text">or</div>
                </div>
                <div className="auth-footer-btn d-flex justify-content-center">
                  <Button.Ripple color="facebook">
                    <Facebook size={14} />
                  </Button.Ripple>
                  <Button.Ripple color="twitter">
                    <Twitter size={14} />
                  </Button.Ripple>
                  <Button.Ripple color="google">
                    <Mail size={14} />
                  </Button.Ripple>
                  <Button.Ripple className="mr-0" color="github">
                    <GitHub size={14} />
                  </Button.Ripple>
                </div>
              </Col>
            </Col>
          </Row>
        </div>
      )}
    </>
  )
}

export default Register
