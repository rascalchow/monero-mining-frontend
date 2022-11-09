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
import { COUTRIES, PHONE_REGEX } from '@src/constants'

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
          <svg viewBox="0 0 139 95" version="1.1" height="28">
            <defs>
              <linearGradient
                x1="100%"
                y1="10.5120544%"
                x2="50%"
                y2="89.4879456%"
                id="linearGradient-1"
              >
                <stop stopColor="#000000" offset="0%"></stop>
                <stop stopColor="#FFFFFF" offset="100%"></stop>
              </linearGradient>
              <linearGradient
                x1="64.0437835%"
                y1="46.3276743%"
                x2="37.373316%"
                y2="100%"
                id="linearGradient-2"
              >
                <stop stopColor="#EEEEEE" stopOpacity="0" offset="0%"></stop>
                <stop stopColor="#FFFFFF" offset="100%"></stop>
              </linearGradient>
            </defs>
            <g
              id="Page-1"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
            >
              <g id="Artboard" transform="translate(-400.000000, -178.000000)">
                <g id="Group" transform="translate(400.000000, 178.000000)">
                  <path
                    d="M-5.68434189e-14,2.84217094e-14 L39.1816085,2.84217094e-14 L69.3453773,32.2519224 L101.428699,2.84217094e-14 L138.784583,2.84217094e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L6.71554594,44.4188507 C2.46876683,39.9813776 0.345377275,35.1089553 0.345377275,29.8015838 C0.345377275,24.4942122 0.230251516,14.560351 -5.68434189e-14,2.84217094e-14 Z"
                    id="Path"
                    className="text-primary"
                    style={{ fill: 'currentColor' }}
                  ></path>
                  <path
                    d="M69.3453773,32.2519224 L101.428699,1.42108547e-14 L138.784583,1.42108547e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L32.8435758,70.5039241 L69.3453773,32.2519224 Z"
                    id="Path"
                    fill="url(#linearGradient-1)"
                    opacity="0.2"
                  ></path>
                  <polygon
                    id="Path-2"
                    fill="#000000"
                    opacity="0.049999997"
                    points="69.3922914 32.4202615 32.8435758 70.5039241 54.0490008 16.1851325"
                  ></polygon>
                  <polygon
                    id="Path-2"
                    fill="#000000"
                    opacity="0.099999994"
                    points="69.3922914 32.4202615 32.8435758 70.5039241 58.3683556 20.7402338"
                  ></polygon>
                  <polygon
                    id="Path-3"
                    fill="url(#linearGradient-2)"
                    opacity="0.099999994"
                    points="101.428699 0 83.0667527 94.1480575 130.378721 47.0740288"
                  ></polygon>
                </g>
              </g>
            </g>
          </svg>
          <h2 className="brand-text text-primary ml-1">Vuexy</h2>
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
                        options={COUTRIES.map((it) => ({
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
