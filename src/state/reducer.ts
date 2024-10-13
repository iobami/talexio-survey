import {
  ActionType,
  type UpdateFormData,
  type AppActions,
  type UpdateQuestionNumber
} from './actions'
import { type AppState } from './state'

export function appReducer (state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case ActionType.UpdateFormData:
      return { ...state, formData: { ...state.formData, ...action.payload } }

    case ActionType.UpdateQuestionNumber:
      return { ...state, questionNumber: action.payload }

    default:
      return state
  }
}

export const updateFormData = (data: any): UpdateFormData => {
  return {
    type: ActionType.UpdateFormData,
    payload: data
  }
}

export const updateQuestionNumber = (
  questionNumber: number
): UpdateQuestionNumber => {
  return {
    type: ActionType.UpdateQuestionNumber,
    payload: questionNumber
  }
}
