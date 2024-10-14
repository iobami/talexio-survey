import { QuestionType } from '@/components/shared/survey/form'

export const initialAppState = {
  formData: {
    age: 0
  },
  questionType: QuestionType.AGE as QuestionType | number,
  direction: 1
}

export type AppState = ReturnType<() => typeof initialAppState>
