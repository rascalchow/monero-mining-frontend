import Proptypes from 'prop-types'
import { useForm } from 'react-hook-form'
import {
  Button,
  Form,
  Input,
  Row,
  Col
} from 'reactstrap'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Sidebar from '@components/sidebar'
import InputPasswordToggle from '@components/input-password-toggle'
import FormField from '@components/form-field'
import { Loader } from 'react-feather'

const SidebarNewUsers = ({ open, toggleSidebar }) => {
  
  const schema = yup.object({
    name: yup.string().required(),
    email: yup.string().required().email(),
    phone: yup.string().required(),
    password: yup.string().required(),
    companyName: yup.string().required(),
    application: yup.string().required(),
    contact: yup.string().required(),
    country: yup.string().required(),
    instantMessenger: yup.string().required(),
    website: yup.string().required(),
    moreInformation: yup.string().required(),
  }).required()

  const {
    control,
    handleSubmit,
    formState: {
      isSubmitting,
      errors,
    }
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
      country: '',
      instantMessenger: '',
      website: '',
      moreInformation: '',	
    }
  })

  const onSubmit = () => {
    toggleSidebar()
  }

  return (
    <Sidebar
      size="lg"
      open={open}
      title="New User"
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
        <FormField
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
        />
        <Button.Ripple
          type="submit"
          block
          color="primary"
        >
          {isSubmitting
            ? (
              <Loader
                className="spinner"
                size={18}
              />
            ) : 'Add User'
          }
        </Button.Ripple>
      </Form>
    </Sidebar>
  )
}

export default SidebarNewUsers

SidebarNewUsers.propTypes = {
  open: Proptypes.bool.isRequired,
  toggleSidebar: Proptypes.func.isRequired
}
