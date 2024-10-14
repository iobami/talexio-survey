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
          <Question questionType={QuestionType.FIRST_CAR}>
            <FormComponent questionType={QuestionType.FIRST_CAR} />
          </Question>
          <Question questionType={QuestionType.DRIVETRAIN}>
            <FormComponent questionType={QuestionType.DRIVETRAIN} />
          </Question>
          <Question questionType={QuestionType.FUEL_EMISSIONS}>
            <FormComponent questionType={QuestionType.FUEL_EMISSIONS} />
          </Question>
          <Question questionType={QuestionType.FAMILY_CARS}>
            <FormComponent questionType={QuestionType.FAMILY_CARS} />
          </Question>
          {/* <Question questionType={QuestionType.CAR_MAKE}>
            <CarMake />
          </Question> */}
        </div>
      </div>
    </div>
  )
}
