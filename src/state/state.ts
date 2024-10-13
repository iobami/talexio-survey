export interface AppState {
  formData: {
    age: number
  }
  questionNumber: number
}

export const initialAppState: AppState = {
  formData: {
    age: 0
  },
  questionNumber: 1
}
