import { useContext, useEffect, useState } from 'react'
import Proptypes from 'prop-types'
import { useForm } from 'react-hook-form'
import { Button, Form, Input, Row, Col } from 'reactstrap'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Sidebar from '@components/sidebar'
import FormField from '@components/form-field'
import { Loader } from 'react-feather'
import useInvite from '@hooks/useInvite'
const SidebarInvitations = ({ open, toggleSidebar, onSubmit }) => {
  const [formData, setFormData] = useState({
    email: '',
  })
  const { createInvite } = useInvite()
  const schema = yup
    .object({
      email: yup.string().required().email(),
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

  const submit = (data) => {
    toggleSidebar(!open)
    const formData = {
      email: data.email,
    }
    createInvite(formData, onSubmit)
  }
  return (
    <Sidebar
      size="lg"
      open={open}
      title="Invitation"
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
    >
      <Form
        className="auth-register-form mt-2"
        onSubmit={handleSubmit(submit)}
      >
        <Col className="px-0 mb-2">
          <FormField
            label="Referral Email"
            name="email"
            control={control}
            error={errors.email}
            className=""
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
        <Button.Ripple type="submit" block color="primary">
          {isSubmitting ? <Loader className="spinner" size={18} /> : 'Submit'}
        </Button.Ripple>
      </Form>
    </Sidebar>
  )
}

export default SidebarInvitations

SidebarInvitations.propTypes = {
  open: Proptypes.bool.isRequired,
  toggleSidebar: Proptypes.func.isRequired,
}
