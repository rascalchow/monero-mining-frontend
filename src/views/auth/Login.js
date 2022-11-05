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

import FormField from '@components/form-field'

import { handleLogin } from '@store/actions/auth' 


const Login = () => {
  const [skin] = useSkin()
  const [fb, setFb] = useState(null)
  const authedUser = useSelector(state => state.auth.userData)
  const schema = yup.object({
    email: yup.string().required().email(),
    password: yup.string().required(),
  }).required()
  const {
    control,
    handleSubmit,
    formState: {
      isSubmitting,
      errors,
      isValid
    }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    }
  })

  const dispatch = useDispatch()
  const illustration = skin === 'dark' ? 'login-v2-dark.svg' : 'login-v2.svg'
  const source = require(`@src/assets/images/pages/${illustration}`).default
  
  const onSubmit = async (data) => {
    try {
      await dispatch(handleLogin(data))
    } catch (error) {
      setFb('Email or password incorrect')
    }
  }

  if (authedUser) {
    return <Redirect to="/" />
  }

  return (
    <div className="auth-wrapper auth-v2">
      <Row className="auth-inner m-0">
        <Link className="brand-logo" to="/">
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
              Welcome to Vuexy! 👋
            </CardTitle>
            <CardText className="mb-2">
              Please sign-in to your account and start the adventure
            </CardText>
            <Alert color="danger" isOpen={!!fb} toggle={() => {setFb(null)}} className="px-3 py-2">
              Email or password incorrect!
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
                render={({field})=> (
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
                render={({field}) => (
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
              <Button.Ripple
                type="submit"
                color="primary"
                block
                disabled={!isValid}
              >
                { isSubmitting 
                ? (
                  <Loader
                    className="spinner"
                    size={18}
                  />
                ) : 'Sign in'}
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