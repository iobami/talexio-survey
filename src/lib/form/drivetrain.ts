import * as Yup from 'yup'

export const schema = {
  drivetrain: Yup.string().required('Please select one option')
}

const validationSchema = Yup.object().shape(schema)

const initialValues = {
  drivetrain: ''
}

const name = 'drivetrain'

const label = 'Which drivetrain do you prefer?'

const type = 'radio'

export enum Options {
  FWD = 'FWD',
  RWD = 'RWD',
  "I don't know" = 'IDK',
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
