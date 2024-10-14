import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  firstCar: Yup.string().required('Please select one option')
})

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
  name,
  type,
  Options
}

export default requirements
