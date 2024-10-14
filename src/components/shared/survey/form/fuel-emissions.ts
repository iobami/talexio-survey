import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  fuelEmissions: Yup.string().required('Please select one option')
})

const initialValues = {
  fuelEmissions: ''
}

const name = 'fuelEmissions'

const label = 'Are you worried about fuel emissions?'

const type = 'radio'

enum Options {
  No = 'No',
  Yes = 'Yes',
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
