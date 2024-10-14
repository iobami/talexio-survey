import React, { type ReactNode } from 'react'

interface IProps {
  children: ReactNode
}

export function Layout (props: IProps) {
  const { children } = props

  return (
    <div className="app_survey_layout">
      <div className="app_survey_layout__bg"></div>
      <div className="app_survey_layout__cct">
        <div className="app_survey_layout__cct__con">{children}</div>
      </div>
    </div>
  )
}
