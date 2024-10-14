import React from 'react'
import { RenderIf } from '../shared'

interface IProps {
  errors?: any
  touched?: any
  name?: string
}

export default function ValidationMessage (props: IProps) {
  const { errors, name = '', touched } = props

  const hasError = (errors[name] && touched[name]) || false

  return (
    <RenderIf condition={hasError}>
      <div>
        <p className="app_input_con__spt--error">{errors[name]}</p>
      </div>
    </RenderIf>
  )
}
