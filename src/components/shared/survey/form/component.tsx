import React from 'react'
import { Formik } from 'formik'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useAppContext } from '@/state/context'
import { updateFormData, updateQuestionType } from '@/state/reducer'
import questions, { type InitialValues, QuestionType } from '.'
import { Pill } from '../../pill'

interface IProps {
  questionType: QuestionType
}

export function FormComponent (props: IProps) {
  const { questionType } = props
  const { dispatch } = useAppContext()

  const { initialValues, validationSchema, label, Options, ...formOptions } =
    questions[questionType]

  const onSubmit = (values: InitialValues) => {
    dispatch(updateFormData(values))

    if (QuestionType.GENDER === questionType) {
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
            setFieldValue,
            errors,
            touched
          } = props

          const formValues = values as Record<string, string | number>

          const getProps = (args: { name: string }) => {
            const name = args.name

            return {
              name,
              id: name,
              value: formValues[name] || '',
              onChange: handleChange,
              onBlur: handleBlur,
              errors,
              touched
            }
          }

          const renderInput = () => {
            if (formOptions.type === 'radio' && Options) {
              return (
                <div className="flex gap-2">
                  {Object.entries(Options).map(([label, value]) => (
                    <Pill
                      key={label}
                      // eslint-disable-next-line @typescript-eslint/no-misused-promises
                      onClick={async () => await setFieldValue(formOptions.name, value)}
                      active={formValues[formOptions.name] === value}
                      size="md"
                    >
                      {label}
                    </Pill>
                  ))}
                </div>
              )
            }

            return (
              <div className="">
                <Input
                  {...getProps({ name: formOptions.name })}
                  {...formOptions}
                  size="xl"
                />
              </div>
            )
          }

          return (
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              <h3 className="app_survey__title">{label}</h3>
              <div className="flex flex-col gap-6">
                {renderInput()}
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
