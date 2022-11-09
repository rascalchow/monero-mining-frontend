import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSkin } from '@hooks/useSkin'
import { Link, Redirect } from 'react-router-dom'
import { Facebook, Twitter, Mail, GitHub, Loader } from 'react-feather'
import InputPasswordToggle from '@components/input-password-toggle'
import { useForm } from 'react-hook-form'
import {
  Row,
  Col,
  CardTitle,
  CardText,
  Form,
  FormGroup,
  Input,
  CustomInput,
  Button,
  Alert,
} from 'reactstrap'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import _ from 'lodash'
import FormField from '@components/form-field'
import logo from '@src/assets/images/logo/nurev_logo.jpeg'
import { handleLogin } from '@store/actions/auth'

const Login = () => {
  const [skin] = useSkin()
  const [fb, setFb] = useState(null)
  const authedUser = useSelector((state) => state.auth.userData)
  const schema = yup
    .object({
      email: yup.string().required().email(),
      password: yup.string().required(),
    })
    .required()
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const dispatch = useDispatch()
  const illustration = skin === 'dark' ? 'login-v2-dark.svg' : 'login-v2.svg'
  const source = require(`@src/assets/images/pages/${illustration}`).default

  const onSubmit = async (data) => {
    try {
      await dispatch(handleLogin(data))
    } catch (error) {
      if (
        error.status === 401 &&
        _.get(error, 'data.errors.msg', '') === 'USER_IS_NOT_APPROVED'
      ) {
        setFb('Please wait until you are approved')
      } else {
        setFb('Email or password incorrect')
      }
    }
  }

  if (authedUser) {
    return <Redirect to="/" />
  }

  return (
    <div className="auth-wrapper auth-v2">
      <Row className="auth-inner m-0">
        <Link className="brand-logo" to="/">
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
              Welcome to Vuexy! 👋
            </CardTitle>
            <CardText className="mb-2">
              Please sign-in to your account and start the adventure
            </CardText>
            <Alert
              color="danger"
              isOpen={!!fb}
              toggle={() => {
                setFb(null)
              }}
              className="px-3 py-2"
            >
              {fb}
            </Alert>
            <Form
              className="auth-login-form mt-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormField
                label="Email"
                name="email"
                control={control}
                error={errors.email}
                render={({ field }) => (
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    autoFocus
                    invalid={!!errors.email}
                    {...field}
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
                    className="input-group-merge"
                    {...field}
                    invalid={!!errors.password}
                  />
                )}
              />
              <FormGroup>
                <CustomInput
                  type="checkbox"
                  className="custom-control-Primary"
                  id="remember-me"
                  label="Remember Me"
                />
              </FormGroup>
              <Button.Ripple type="submit" color="primary" block>
                {isSubmitting ? (
                  <Loader className="spinner" size={18} />
                ) : (
                  'Sign in'
                )}
              </Button.Ripple>
            </Form>
            <p className="text-center mt-2">
              <span className="mr-25">New on our platform?</span>
              <Link to="/register">
                <span>Create an account</span>
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

export default Login
