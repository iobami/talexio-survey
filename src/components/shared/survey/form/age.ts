import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  age: Yup.number()
    .min(0)
    .max(100)
    .required('Please enter your age')
})

const initialValues = {
  age: 0
}

const name = 'age'

const label = 'How old are you?'

const placeholder = 'Enter your age'

const type = 'number'

const requirements = { validationSchema, initialValues, label, placeholder, name, type }

export default requirements
