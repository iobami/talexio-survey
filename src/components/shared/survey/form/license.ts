import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  hasLicense: Yup.string().required('Please select one option')
})

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
