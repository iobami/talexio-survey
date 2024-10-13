import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  age: Yup.number()
    .min(0)
    .max(100)
    .required('Please enter your age')
})

const initialValues = {
  hasLicense: ''
}

const name = 'hasLicense'

const label = 'Do you own a car driving license?'

const type = 'toggle'

enum Options {
  Yes = 'Yes',
  'No, I prefer using other transport' = 'No'
}

const requirements = { validationSchema, initialValues, label, name, type, Options }

export default requirements
