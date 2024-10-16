import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  gender: Yup.string().required('Please select your gender')
})

const initialValues = {
  gender: ''
}

const name = 'gender'

const label = 'Select your gender'

const placeholder = 'Select your gender'

const type = 'dropdown'

export enum Options {
  Male = 'M',
  Female = 'F',
  Other = 'Other'
}

const requirements = { validationSchema, initialValues, label, placeholder, name, type, Options }

export default requirements
