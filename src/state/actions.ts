import { type QuestionType } from '@/components/shared/survey/form'

export enum ActionType {
  UpdateFormData,
  UpdateQuestionType,
}

export interface UpdateFormData {
  type: ActionType.UpdateFormData
  payload: any
}

export interface UpdateQuestionType {
  type: ActionType.UpdateQuestionType
  payload: QuestionType
}

export type AppActions = UpdateFormData | UpdateQuestionType
