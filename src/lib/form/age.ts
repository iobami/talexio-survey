import * as Yup from 'yup'

export const schema = {
  age: Yup.number().min(0).max(100).required('Please enter your age')
}

const validationSchema = Yup.object().shape(schema)

const initialValues = {
  age: undefined as number | undefined
}

const name = 'age'

const label = 'How old are you?'

const placeholder = 'Enter your age'

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
