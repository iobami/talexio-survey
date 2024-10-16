import * as Yup from 'yup'

export const schema = {
  hasLicense: Yup.string().required('Please select one option')
}

const validationSchema = Yup.object().shape(schema)

const initialValues = {
  hasLicense: ''
}

const name = 'hasLicense'

const label = 'Do you own a car driving license?'

const type = 'radio'

enum Options {
  Yes = 'Yes',
  'No, I prefer using other transport' = 'No',
}

const requirements = {
  validationSchema,
  initialValues,
  label,
  placeholder: undefined,
  name,
  type,
  Options
}

export default requirements
