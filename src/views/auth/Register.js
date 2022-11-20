import { Fragment, useState } from 'react'
import { useSkin } from '@hooks/useSkin'

import { useDispatch } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { handleRegister } from '@store/actions/auth'
import { Link, Redirect } from 'react-router-dom'
import InputPasswordToggle from '@components/input-password-toggle'
import { Facebook, Twitter, Mail, GitHub, Loader } from 'react-feather'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

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
  Alert,
} from 'reactstrap'

import ReactSelect from 'react-select'

import _ from 'lodash'

import { selectThemeColors } from '@utils'
import FormField from '@components/form-field'
import logo from '@src/assets/images/logo/nurev_logo.jpeg'
import { COUNTRIES, PHONE_REGEX } from '@src/constants'

const Register = () => {
  const [skin] = useSkin()
  const dispatch = useDispatch()
  const [fbMsg, setFbMsg] = useState(null)
  const [term, setTerm] = useState(false)
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
    })
    .required()

  const {
    control,
    handleSubmit,
    setError,
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

  const onSubmit = async (data) => {
    const formData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
      userProfile: {
        companyName: data.companyName,
        application: data.application,
        contact: data.contact,
        country: data.country.value,
        instantMessenger: data.instantMessenger,
        website: data.website,
        moreInformation: data.moreInformation,
      },
    }
    try {
      return await dispatch(handleRegister(formData))
    } catch (error) {
      if (error.isAxiosError) {
        if (error.response.status === 422) {
          if (error.response.data.errors.msg === 'EMAIL_ALREADY_EXISTS') {
            setError('email', {
              type: 'custom',
              message: 'Email is already taken',
            })
          } else {
            setFbMsg(_.get(error, 'response.data.errors.msg', 'Server Error'))
          }
        }
      }
      throw error
    }
  }
  if (isSubmitSuccessful) {
    return <Redirect to="/login" />
  }

  return (
    <div className="auth-wrapper auth-v2">
      <Row className="auth-inner m-0">
        <Link className="brand-logo" to="/" onClick={(e) => e.preventDefault()}>
          <img src={logo} alt="logo" width="200" />
        </Link>
        <Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
          <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
            <img className="img-fluid" src={source} alt="Login V2" />
          </div>
        </Col>
        <Col
          className="d-flex align-items-center auth-bg px-2 p-lg-5"
          lg="4"
          sm="12"
        >
          <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
            <CardTitle tag="h2" className="font-weight-bold mb-1">
              Adventure starts here 🚀
            </CardTitle>
            <CardText className="mb-2">
              Make your app management easy and fun!
            </CardText>
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
            <Form
              className="auth-register-form mt-2"
              onSubmit={handleSubmit(onSubmit)}
            >
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
              <Row>
                <Col>
                  <FormField
                    label="Email"
                    name="email"
                    control={control}
                    error={errors.email}
                    render={({ field }) => (
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        invalid={!!errors.email}
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
                error={errors.name}
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
                        className={`react-select rounded${
                          !!errors.country && ' border-danger'
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
  )
}

export default Register
