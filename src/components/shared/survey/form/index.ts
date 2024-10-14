import ageRequirements from './age'
import genderRequirements from './gender'
import licenseRequirements from './license'
import firstCarRequirements from './first-car'
import drivetrainRequirements from './drivetrain'
import fuelEmissionsRequirements from './fuel-emissions'
import familyCarsRequirements from './family-cars'

export enum QuestionType {
  AGE = 0,
  GENDER = 1,
  LICENSE = 2,
  FIRST_CAR = 3,
  DRIVETRAIN = 4,
  FUEL_EMISSIONS = 5,
  FAMILY_CARS = 6,
  CAR_MAKE = 7,
}

export const formData = {
  ...ageRequirements.initialValues,
  ...genderRequirements.initialValues,
  ...licenseRequirements.initialValues,
  ...firstCarRequirements.initialValues,
  ...drivetrainRequirements.initialValues,
  ...fuelEmissionsRequirements.initialValues,
  ...familyCarsRequirements.initialValues
}

type AllValues = ReturnType<() => typeof ageRequirements.initialValues> &
ReturnType<() => typeof genderRequirements.initialValues> &
ReturnType<() => typeof licenseRequirements.initialValues> &
ReturnType<() => typeof firstCarRequirements.initialValues> &
ReturnType<() => typeof drivetrainRequirements.initialValues> &
ReturnType<() => typeof fuelEmissionsRequirements.initialValues> &
ReturnType<() => typeof familyCarsRequirements.initialValues>

export type InitialValues = Partial<AllValues>

const questions = {
  [QuestionType.AGE]: ageRequirements,
  [QuestionType.GENDER]: genderRequirements,
  [QuestionType.LICENSE]: licenseRequirements,
  [QuestionType.FIRST_CAR]: firstCarRequirements,
  [QuestionType.DRIVETRAIN]: drivetrainRequirements,
  [QuestionType.FUEL_EMISSIONS]: fuelEmissionsRequirements,
  [QuestionType.FAMILY_CARS]: familyCarsRequirements,
  [QuestionType.CAR_MAKE]: undefined
}

export default questions
