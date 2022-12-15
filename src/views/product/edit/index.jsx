import { useEffect, useState } from 'react'
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
  Spinner,
} from 'reactstrap'
import { get, update } from './store/action'

import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import FormField from '@components/form-field'
import FileUpload from '@components/file-upload'
import SubmitButton from '@components/submit-button'
import { API_URL } from '../../../constants'

const EditProduct = () => {
  const dispatch = useDispatch()

  const productData = useSelector((state) => state.product.edit)
  const [companyLogo, setCompanyLogo] = useState({})
  const [productIcon, setProductIcon] = useState({})
  const [companyLogoDefault, setCompanyLogoDefault] = useState()
  const [productIconDefault, setProductIconDefault] = useState()
  const schema = yup
    .object({
      productName: yup.string().required(),
      currencyName: yup.string().required(),
      userPercentage: yup.number().required(),
      numberOfVirtualCoins: yup.number().required(),
    })
    .required()
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      productName: '',
      currencyName: '',
      userPercentage: '',
      numberOfVirtualCoins: '',
    },
  })

  useEffect(() => {
    dispatch(get())
  }, [])
  useEffect(() => {
    if (productData.data) {
      setValue('productName', productData.data.application)
      setValue('currencyName', productData.data.currencyName)
      setValue('userPercentage', productData.data.userPercentage)
      setValue('numberOfVirtualCoins', productData.data.numberOfVirtualCoins)
      if (productData.data.companyLogo) {
        setCompanyLogoDefault(`${API_URL}/${productData.data.companyLogo}`)
      }
      if (productData.data.productIcon) {
        setProductIconDefault(`${API_URL}/${productData.data.productIcon}`)
      }
    }
  }, [productData.data])

  const onSubmit = (data) => {
    const formData = new FormData()
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key])
    })
    if (companyLogo) {
      formData.append('companyLogo', companyLogo)
    }
    if (productIcon) {
      formData.append('productIcon', productIcon)
    }
    return dispatch(update(formData))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update product configuration</CardTitle>
      </CardHeader>
      <CardBody>
        {productData.isLoading ? (
          <div className="py-4 d-flex justify-content-center">
            <Spinner className="spinner" />
          </div>
        ) : (
          productData.data && (
            <Form onSubmit={handleSubmit(onSubmit)}>
              <FileUpload
                defaultSrc={companyLogoDefault}
                label="Company Logo"
                alt="campany logo"
                onChange={(value) => {
                  setCompanyLogo(value)
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

              <FileUpload
                defaultSrc={productIconDefault}
                label="Product Icon"
                alt="product icon"
                onChange={(value) => {
                  setProductIcon(value)
                }}
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
                {productData.data.installer && (
                  <div>
                    <div>Software Download Link:</div>
                    <a
                      href={`${API_URL}/${productData.data.installer}`}
                      download
                    >
                      Download product setup file
                    </a>
                  </div>
                )}

                <SubmitButton
                  isSubmitting={isSubmitting}
                  disabled={!companyLogo || !productIcon}
                >
                  Save Change
                </SubmitButton>
              </div>
            </Form>
          )
        )}
      </CardBody>
    </Card>
  )
}

export default EditProduct
