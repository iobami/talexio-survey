import * as Yup from 'yup'

export const schema = {
  firstCar: Yup.string().required('Please select one option')
}

const validationSchema = Yup.object().shape(schema)

const initialValues = {
  firstCar: ''
}

const name = 'firstCar'

const label = ' Is this your first car?'

const type = 'radio'

enum Options {
  Yes = 'Yes',
  No = 'No',
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
