import { useDispatch } from 'react-redux'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Form, Button, Spinner, Card, CardBody } from 'reactstrap'
import InputPasswordToggle from '@components/input-password-toggle'
import FormField from '@components/form-field'
import useProfile from '@hooks/useProfile'

const ChangePassword = () => {

  const { updatePassword } = useProfile();

  const SignupSchema = yup.object().shape({
    password: yup.string().required(),
    confirmPassword: yup
      .string()
      .required()
      .oneOf([yup.ref(`password`), null], 'Passwords must match'),
  })

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(SignupSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = (value) => {
    updatePassword({ password: value.password })
  }

  return (
    <Card>
      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormField
            label="New Password"
            name="password"
            control={control}
            error={errors.password}
            render={({ field }) => (
              <InputPasswordToggle
                className="input-group-merge"
                {...field}
                invalid={!!errors.password}
                placeholder="Enter new password"
              />
            )}
          />
          <FormField
            label="Confirm new Password"
            name="confirmPassword"
            control={control}
            error={errors.confirmPassword}
            render={({ field }) => (
              <InputPasswordToggle
                className="input-group-merge"
                {...field}
                invalid={!!errors.confirmPassword}
                placeholder="Confirm new password"
              />
            )}
          />
          <Button.Ripple type="submit" color="primary">
            <div className="d-flex aiign-items-cente">
              {isSubmitting && (
                <>
                  <Spinner size="sm" />
                  &nbsp;{' '}
                </>
              )}
              Update
            </div>
          </Button.Ripple>
        </Form>
      </CardBody>
    </Card>
  )
}

export default ChangePassword
