export enum ActionType {
  UpdateFormData,
  UpdateQuestionNumber,
}

export interface UpdateFormData {
  type: ActionType.UpdateFormData
  payload: any
}

export interface UpdateQuestionNumber {
  type: ActionType.UpdateQuestionNumber
  payload: any
}

export type AppActions = UpdateFormData | UpdateQuestionNumber
