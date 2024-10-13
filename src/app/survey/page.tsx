'use client'
import React from 'react'
import { Age, Gender } from '@/components/shared/survey/form'
import { Question } from '@/components/shared/survey/question'

export default function Page () {
  return (
    <div className="app_survey_container">
      <div className="app_survey_container__upper">
        <div className="app_survey">
          <Question questionNumber={1}>
            <Age />
          </Question>

          <Question questionNumber={2}>
            <Gender />
          </Question>
        </div>
      </div>
    </div>
  )
}
