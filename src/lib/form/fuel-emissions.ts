import * as Yup from 'yup'

export const schema = {
  fuelEmissions: Yup.string().required('Please select one option')
}

const validationSchema = Yup.object().shape(schema)

const initialValues = {
  fuelEmissions: ''
}

const name = 'fuelEmissions'

const label = 'Are you worried about fuel emissions?'

const type = 'radio'

enum Options {
  Yes = 'Yes',
  No = 'No'
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
