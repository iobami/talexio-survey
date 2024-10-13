import ageRequirements from './age'
import genderRequirements from './gender'

export enum QuestionType {
  AGE = 0,
  GENDER = 1,
}

export type InitialValues = ReturnType<() => typeof ageRequirements.initialValues>
| ReturnType<() => typeof genderRequirements.initialValues>

const questions = {
  [QuestionType.AGE]: ageRequirements,
  [QuestionType.GENDER]: genderRequirements
}

export default questions
