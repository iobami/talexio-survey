import { QuestionType } from '@/components/shared/survey/form'

export const initialAppState = {
  formData: {
    age: 0
  },
  questionType: QuestionType.AGE
}

export type AppState = ReturnType<() => typeof initialAppState>
