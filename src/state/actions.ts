import { type QuestionType } from '@/lib/form'

export enum ActionType {
  UpdateFormData,
  UpdateQuestionType,
  UpdateDirection,
}

export interface UpdateFormData {
  type: ActionType.UpdateFormData
  payload: any
}

export interface UpdateQuestionType {
  type: ActionType.UpdateQuestionType
  payload: QuestionType
}

export interface UpdateDirection {
  type: ActionType.UpdateDirection
  payload: QuestionType
}

export type AppActions = UpdateFormData | UpdateQuestionType | UpdateDirection
