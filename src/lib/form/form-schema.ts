import * as Yup from 'yup'
import { schema as ageSchema } from './age'
import { schema as genderSchema } from './gender'
import { schema as licenseSchema } from './license'
import { schema as firstCarSchema } from './first-car'
import { schema as drivetrainSchema } from './drivetrain'
import { schema as fuelEmissionsSchema } from './fuel-emissions'
import { schema as familyCarsSchema } from './family-cars'

const adolescentsSchema = Yup.object({
  ...ageSchema,
  ...genderSchema
})

const unlicensedSchema = Yup.object({
  ...ageSchema,
  ...genderSchema,
  ...licenseSchema
})

const firstTimersSchema = Yup.object({
  ...ageSchema,
  ...genderSchema,
  ...licenseSchema,
  ...firstCarSchema
})

const mainSchema = Yup.object({
  ...ageSchema,
  ...genderSchema,
  ...licenseSchema,
  // ...firstCarSchema, // optional depending on age 18 - 25
  ...drivetrainSchema,
  ...fuelEmissionsSchema,
  ...familyCarsSchema
})

const formSchema = {
  adolescentsSchema,
  unlicensedSchema,
  firstTimersSchema,
  mainSchema
}

export default formSchema
