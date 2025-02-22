import * as Yup from 'yup'

export const schema = {
  familyCars: Yup.number()
    .min(0, 'Please enter a valid number')
    .required('Please enter the number of cars')
}

const validationSchema = Yup.object().shape(schema)

const initialValues = {
  familyCars: undefined as number | undefined
}

const name = 'familyCars'

const label = 'How many cars do you have in your family?'

const placeholder = 'Enter number of cars'

const type = 'number'

const requirements = {
  validationSchema,
  initialValues,
  label,
  placeholder,
  name,
  type,
  Options: undefined
}

export default requirements
