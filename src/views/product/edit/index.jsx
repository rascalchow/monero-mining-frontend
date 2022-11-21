import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Form,
  Input,
  Row,
  Col,
  Button,
  Spinner,
} from 'reactstrap'
import { getProductInfo } from './store/action'

import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import FormField from '../../../@core/components/form-field'
import FileUpload from '../../../@core/components/file-upload'

const EditProduct = () => {
  const dispatch = useDispatch()
  const userData = useSelector((state) => state.product.edit)
  const schema = yup
    .object({
      productName: yup.string().required(),
      currencyName: yup.string().required(),
      userPercentage: yup.string().required(),
      numberOfVirtualCoins: yup.string().required(),
    })
    .required()
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      companyLogo: '',
      productName: '',
      currencyName: '',
      userPercentage: '',
      numberOfVirtualCoins: '',
      productIcon: '',
    },
  })

  useEffect(() => {
    dispatch(getProductInfo())
  }, [])
  useEffect(() => {
    if (userData.data) {
      console.log(userData.data)
      setValue('productName', userData.data.userProfileId.application)
      setValue('currencyName', userData.data.userProfileId.currencyName)
      setValue('userPercentage', userData.data.userProfileId.userPercentage)
      setValue(
        'numberOfVirtualCoins',
        userData.data.userProfileId.numberOfVirtualCoins,
      )
    }
  }, [userData])

  const onSubmit = (data) => {
    console.log(data.companyLogo)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update product configuration</CardTitle>
      </CardHeader>
      <CardBody>
        {userData.isLoading ? (
          <div className="py-4 d-flex justify-content-center">
            <Spinner className="spinner" />
          </div>
        ) : (
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FileUpload
              alt="campany logo"
              onChange={(e) => {
                setValue('companyLogo', e.target.files)
              }}
            />
            <Row>
              <Col>
                <FormField
                  label="Product Name"
                  name="productName"
                  control={control}
                  error={errors.productName}
                  render={({ field }) => <Input {...field} />}
                />
              </Col>
              <Col>
                <FormField
                  label="Currency Name"
                  name="currencyName"
                  control={control}
                  error={errors.currencyName}
                  render={({ field }) => <Input {...field} />}
                />
              </Col>
            </Row>
            <FormField
              label="Product Icon"
              name="productIcon"
              control={control}
              error={errors.productIcon}
              render={({ field }) => (
                <FileUpload alt="product icon" {...field} />
              )}
            />
            <Row>
              <Col>
                <FormField
                  label="User Percentage"
                  name="userPercentage"
                  control={control}
                  error={errors.userPercentage}
                  render={({ field }) => <Input {...field} />}
                />
              </Col>
              <Col>
                <FormField
                  label="How many virtual coins(=$1USD)?"
                  name="numberOfVirtualCoins"
                  control={control}
                  error={errors.numberOfVirtualCoins}
                  render={({ field }) => <Input {...field} />}
                />
              </Col>
            </Row>
            <div className="d-flex justify-content-between mt-2">
              <div>
                <div>Software Download Link:</div>
                <a href="#">Download product setup file</a>
              </div>
              <Button.Ripple color="primary" type="submit" disabled={!isDirty}>
                {isSubmitting && <Spinner className="spinner" />}
                Save Changes
              </Button.Ripple>
            </div>
          </Form>
        )}
      </CardBody>
    </Card>
  )
}

export default EditProduct
