import React from 'react'
import { Formik } from 'formik'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useAppContext } from '@/state/context'
import { updateFormData, updateQuestionType } from '@/state/reducer'
import questions, { type InitialValues, QuestionType } from '.'

interface IProps {
  questionType: QuestionType
}

export function FormComponent (props: IProps) {
  const { questionType } = props
  const { dispatch } = useAppContext()

  const { initialValues, validationSchema, ...formOptions } =
    questions[questionType]

  const onSubmit = (values: InitialValues) => {
    dispatch(updateFormData(values))
    dispatch(updateQuestionType(QuestionType.GENDER))
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
              value: (values as any)[name],
              onChange: handleChange,
              onBlur: handleBlur,
              errors,
              touched
            }
          }

          return (
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              <h3 className="app_survey__title">{formOptions.label}</h3>
              <div className="flex flex-col gap-6">
                <div className="">
                  <Input
                    {...getProps({ name: formOptions.name })}
                    type="number"
                    placeholder={formOptions.placeholder}
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
