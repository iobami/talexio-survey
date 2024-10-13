import React from 'react'
import { Formik } from 'formik'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useAppContext } from '@/state/context'
import { updateFormData, updateQuestionType } from '@/state/reducer'
import questions, { type InitialValues, QuestionType } from '.'

export function FormComponent () {
  const { dispatch, state } = useAppContext()

  const { initialValues, validationSchema, ...formOptions } = questions[state.questionType]

  const onSubmit = (values: InitialValues) => {
    dispatch(updateFormData(values))

    if (QuestionType.GENDER === state.questionType) {
      dispatch(updateQuestionType(QuestionType.LICENSE))
    } else {
      dispatch(updateQuestionType(QuestionType.GENDER))
    }
  }

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={onSubmit}
      >
        {(props) => {
          const {
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            errors,
            touched
          } = props

          const getProps = (args: { name: string }) => {
            const name = args.name

            return {
              name,
              id: name,
              value: (values as Record<string, string | number>)[name],
              onChange: handleChange,
              onBlur: handleBlur,
              errors,
              touched
            }
          }

          return (
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              <h3 className="app_survey__title">
                {formOptions.label}
              </h3>
              <div className="flex flex-col gap-6">
                <div className="">
                  <Input
                    {...getProps({ name: formOptions.name })}
                    {...formOptions}
                    size="xl"
                  />
                </div>
              </div>

              <div className="">
                <Button
                  size="md"
                  backgroundColor="shark-950"
                  className="app_survey__btn"
                  type="submit"
                >
                  Next
                </Button>
              </div>
            </form>
          )
        }}
      </Formik>
    </div>
  )
}
