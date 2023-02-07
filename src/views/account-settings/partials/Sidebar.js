import { useContext, useEffect, useState } from 'react'
import Proptypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Button, Form, Input, Row, Col } from 'reactstrap'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Sidebar from '@components/sidebar'
import FormField from '@components/form-field'
import { Loader } from 'react-feather'
import { useProfileInfoCtx } from '@context/user/profileInfoContext'
import { useParams, useLocation } from 'react-router-dom'
import { PHONE_REGEX } from '@src/constants'

const SidebarNewUsers = ({ open, toggleSidebar, user, onSave }) => {
  const { overview, usersInfo } = useProfileInfoCtx()
  const auth = useSelector((state) => state.auth.userData)
  const location = useLocation()
  const { id } = useParams()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    application: '',
    contact: '',
    country: '',
    instantMessenger: '',
    website: '',
    moreInformation: '',
  })
  const schema = yup
    .object({
      name: yup.string().required(),
      email: yup.string().required().email(),
      phone: yup
        .string()
        .required()
        .matches(PHONE_REGEX, 'Not a valid phone number'),
      companyName: yup.string().required(),
      application: yup.string().required(),
      contact: yup.string().required(),
      country: yup.string().required(),
      instantMessenger: yup.string().required(),
      website: yup.string().required(),
      moreInformation: yup.string().required(),
    })
    .required()
  const {
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: formData,
  })

  const onSubmit = (info) => {
    toggleSidebar()
    usersInfo.editAccountSetting(info)
    onSave();
  }

  useEffect(() => {
    if (user) {
      setValue('name', user.name)
      setValue('email', user.email)
      setValue('phone', user.phone)
      setValue('application', user.application)
      setValue('contact', user.contact)
      setValue('country', user.country)
      setValue('companyName', user.companyName)
      setValue('instantMessenger', user.instantMessenger)
      setValue('website', user.website)
      setValue('moreInformation', user.moreInformation)
    }
  }, [user])
  return (
    <Sidebar
      size="lg"
      open={open}
      title="Edit User"
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
    >
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
              placeholder="Nurev, LLC"
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
                  placeholder="Nurev, LLC"
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
                <Input
                  type="text"
                  placeholder="Nurev, LLC"
                  invalid={!!errors.country}
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
        {/* <FormField
          label="Password"
          name="password"
          control={control}
          error={errors.password}
          render={({ field }) => (
            <InputPasswordToggle
              {...field}
              invalid={!!errors.password}
            >
            </InputPasswordToggle>
          )}
        /> */}
        <Button.Ripple type="submit" block color="primary">
          {isSubmitting ? <Loader className="spinner" size={18} /> : 'Submit'}
        </Button.Ripple>
      </Form>
    </Sidebar>
  )
}

export default SidebarNewUsers

SidebarNewUsers.propTypes = {
  open: Proptypes.bool.isRequired,
  toggleSidebar: Proptypes.func.isRequired,
}
