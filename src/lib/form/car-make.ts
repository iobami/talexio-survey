import * as Yup from 'yup'

function testBMWModel (model: string) {
  const lowerModel = model.toLowerCase()
  const pattern1 = /^m?\d+d?$|^m?\d+i?$/
  const pattern2 = /^[xz]\d$/
  return pattern1.test(lowerModel) || pattern2.test(lowerModel)
}

const validationSchema = Yup.object().shape({
  cars: Yup.array().of(
    Yup.object({
      carMake: Yup.string().required('Please select car make'),
      modelName: Yup.string()
        .required('Please enter the model name')
        .test({
          test: (value, ctx) => {
            if (ctx?.parent?.carMake !== Options.BMW) return true
            return testBMWModel(value)
          },
          message: 'Please enter a vaild BMW model'
        })
    })
  )
})

export enum Options {
  BMW = 'BMW',
  Toyota = 'Toyota',
  Tesla = 'Tesla',
  Honda = 'Honda',
  Others = 'Others',
}

const requirements = {
  validationSchema,
  initialValues: undefined,
  label: undefined,
  placeholder: undefined,
  name: undefined,
  type: undefined,
  Options
}

export default requirements
