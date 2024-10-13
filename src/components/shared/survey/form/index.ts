import ageRequirements from './age'
import genderRequirements from './gender'
import licenseRequirements from './license'

export enum QuestionType {
  AGE = 0,
  GENDER = 1,
  LICENSE = 2,
}

export type InitialValues = ReturnType<() => typeof ageRequirements.initialValues>
| ReturnType<() => typeof genderRequirements.initialValues>
| ReturnType<() => typeof licenseRequirements.initialValues>

const questions = {
  [QuestionType.AGE]: ageRequirements,
  [QuestionType.GENDER]: genderRequirements,
  [QuestionType.LICENSE]: licenseRequirements
}

export default questions
