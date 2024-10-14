import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  drivetrain: Yup.string().required('Please select one option')
})

const initialValues = {
  drivetrain: ''
}

const name = 'drivetrain'

const label = ' Is this your first car?'

const type = 'radio'

enum Options {
  FWD = 'FWD',
  RWD = 'RWD',
  'I don’t know' = 'I don’t know',
}

const requirements = {
  validationSchema,
  initialValues,
  label,
  name,
  type,
  Options
}

export default requirements
