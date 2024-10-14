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
  FIRSTCAR = 3,
  DRIVETRAIN = 4,
  FUELEMISSIONS = 5,
  FAMILYCARS = 6,
}

export type InitialValues =
  | ReturnType<() => typeof ageRequirements.initialValues>
  | ReturnType<() => typeof genderRequirements.initialValues>
  | ReturnType<() => typeof licenseRequirements.initialValues>
  | ReturnType<() => typeof firstCarRequirements.initialValues>
  | ReturnType<() => typeof drivetrainRequirements.initialValues>
  | ReturnType<() => typeof fuelEmissionsRequirements.initialValues>
  | ReturnType<() => typeof familyCarsRequirements.initialValues>

const questions = {
  [QuestionType.AGE]: ageRequirements,
  [QuestionType.GENDER]: genderRequirements,
  [QuestionType.LICENSE]: licenseRequirements,
  [QuestionType.FIRSTCAR]: firstCarRequirements,
  [QuestionType.DRIVETRAIN]: drivetrainRequirements,
  [QuestionType.FUELEMISSIONS]: fuelEmissionsRequirements,
  [QuestionType.FAMILYCARS]: familyCarsRequirements
}

export default questions
