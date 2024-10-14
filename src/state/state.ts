import { formData, QuestionType } from '@/components/shared/survey/form'

export const initialAppState = {
  formData,
  questionType: QuestionType.AGE as QuestionType | number,
  direction: 1
}

export type AppState = ReturnType<() => typeof initialAppState>
