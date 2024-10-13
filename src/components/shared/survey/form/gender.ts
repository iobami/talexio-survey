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

const requirements = { validationSchema, initialValues, label, placeholder, name, type }

export default requirements
