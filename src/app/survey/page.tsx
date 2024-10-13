'use client'
import React from 'react'
import { Question } from '@/components/shared/survey/question'
import { FormComponent } from '@/components/shared/survey/form/component'
import { QuestionType } from '@/components/shared/survey/form'

export default function Page () {
  return (
    <div className="app_survey_container">
      <div className="app_survey_container__upper">
        <div className="app_survey">
          <Question questionType={QuestionType.AGE}>
            <FormComponent questionType={QuestionType.AGE} />
          </Question>
          <Question questionType={QuestionType.GENDER}>
            <FormComponent questionType={QuestionType.GENDER} />
          </Question>
          <Question questionType={QuestionType.LICENSE}>
            <FormComponent questionType={QuestionType.LICENSE} />
          </Question>
        </div>
      </div>
    </div>
  )
}
