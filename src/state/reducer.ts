import { type QuestionType } from '@/components/shared/survey/form'
import {
  ActionType,
  type UpdateFormData,
  type AppActions
} from './actions'
import { type AppState } from './state'

export function appReducer (state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case ActionType.UpdateFormData:
      return { ...state, formData: { ...state.formData, ...action.payload } }

    case ActionType.UpdateQuestionType:
      return { ...state, questionType: action.payload }

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

export const updateQuestionType = (questionType: QuestionType) => ({
  type: ActionType.UpdateQuestionType,
  payload: questionType
})
