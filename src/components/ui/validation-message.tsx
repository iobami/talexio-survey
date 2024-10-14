import React from 'react'
import { RenderIf } from '../shared'
import { Field, getIn } from 'formik'

interface IProps {
  name?: string
}

export default function ValidationMessage (props: IProps) {
  const { name = '' } = props

  return (
    <Field name={name}>
      {({ form }: { form: any }) => {
        const error = getIn(form.errors, name)
        const touch = getIn(form.touched, name)

        return (
          <RenderIf condition={error && touch}>
            <div>
              <p className="app_input_con__spt--error">{error}</p>
            </div>
          </RenderIf>
        )
      }}
    </Field>
  )
}
