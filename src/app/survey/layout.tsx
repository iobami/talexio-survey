import React, { type ReactNode } from 'react'

interface IProps {
  children: ReactNode
}

export default function Layout (props: IProps) {
  const { children } = props

  return (
    <div className="app_survey_layout">
      <div className="app_survey_layout__bg"></div>
      <div className="app_survey_layout__cct">{children}</div>
    </div>
  )
}
