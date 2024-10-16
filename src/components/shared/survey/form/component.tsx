import React, { useState } from 'react'
import { Formik } from 'formik'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useAppContext } from '@/state/context'
import {
  updateDirection,
  updateFormData,
  updateQuestionType
} from '@/state/reducer'
import questions, { type InitialValues, QuestionType } from '@/lib/form'
import { Pill } from '../../pill'
import { RenderIf } from '../../render-if'
import ValidationMessage from '@/components/ui/validation-message'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { initialAppState } from '@/state/state'
import queries from '@/services/queries/survey'

interface IProps {
  questionType: QuestionType
}

export function FormComponent (props: IProps) {
  const { questionType } = props
  const { dispatch, state } = useAppContext()

  const [isComplete, setIsComplete] = useState(false)
  const [message, setMessage] = useState('')

  const { mutate, isLoading } = queries.create({
    onSuccess: () => {
      handleComplete()
    }
  })

  const question = questions[questionType]

  if (!question) return null

  const { initialValues, validationSchema, label, Options, ...formOptions } = question

  const onSubmit = async (values: InitialValues) => {
    setMessage('')

    if ((values.age ?? 0) < 18 && questionType === QuestionType.GENDER) {
      mutate(values)
      return
    }

    if (
      questionType === QuestionType.LICENSE &&
      values.hasLicense?.toLowerCase() === 'no'
    ) {
      mutate(values)
      return
    }

    if (
      questionType === QuestionType.LICENSE &&
      values.hasLicense?.toLowerCase() === 'yes' &&
      (values.age ?? 0) > 25
    ) {
      handleNext(values, QuestionType.DRIVETRAIN) // skip QuestionType.FIRST_CAR
      return
    }

    if (
      questionType === QuestionType.FIRST_CAR &&
      values.firstCar?.toLowerCase() === 'yes'
    ) {
      setMessage('We are targeting more experienced clients, thank you for your interest')
      mutate(values)
      return
    }

    handleNext(values)
  }

  const handleNext = (values: InitialValues, type?: QuestionType) => {
    dispatch(updateFormData(values))
    dispatch(updateDirection(1))
    dispatch(updateQuestionType(type ?? questionType + 1))
  }

  const handlePrevious = () => {
    dispatch(updateDirection(-1))
    if (
      questionType === QuestionType.DRIVETRAIN &&
      state.formData.hasLicense?.toLowerCase() === 'yes' &&
      (state.formData.age ?? 0) > 25
    ) {
      dispatch(updateQuestionType(QuestionType.LICENSE)) // skip QuestionType.FIRST_CAR
    } else {
      dispatch(updateQuestionType(questionType - 1))
    }
  }

  const handleRestart = () => {
    dispatch(updateDirection(-1))
    dispatch(updateQuestionType(QuestionType.AGE))
    setIsComplete(false)
    setMessage('')
  }

  const handleComplete = () => {
    dispatch(updateFormData(initialAppState.formData))
    setIsComplete(true)
  }

  if (isComplete) {
    return (
      <div className="flex flex-col gap-8">
        <h3 className="app_survey__title">
          {message || 'Thanks for taking time to fill this survey!'}
        </h3>

        <div className="flex gap-4">
          <Button
            size="md"
            backgroundColor="shark-950"
            className="app_survey__btn"
            onClick={handleRestart}
          >
            Restart survey?
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Formik
        initialValues={{
          ...(initialValues as InitialValues),
          ...state.formData
        }}
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
            if (formOptions.type === 'dropdown' && Options) {
              const { value, ...dropdownProps } = getProps({
                name: formOptions.name
              })
              const selectedValue = value ? String(value) : undefined

              return (
                <div className="flex flex-col gap-2">
                  <Select
                    {...dropdownProps}
                    value={selectedValue}
                    onValueChange={(val) => {
                      void setFieldValue(dropdownProps.name, val)
                    }}
                  >
                    <SelectTrigger
                      className={`w-full app_select app_select--${
                        !selectedValue ? 'unselected' : ''
                      }`}
                    >
                      <SelectValue placeholder={formOptions.placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {Object.entries(Options).map(([label, value]) => (
                          <SelectItem key={label} value={value as string}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <ValidationMessage name={formOptions.name} />
                </div>
              )
            }

            if (formOptions.type === 'radio' && Options) {
              return (
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    {Object.entries(Options).map(([label, value]) => (
                      <Pill
                        key={label}
                        onClick={() => {
                          void setFieldValue(formOptions.name, value)
                        }}
                        active={formValues[formOptions.name] === value}
                        size="md"
                      >
                        {label}
                      </Pill>
                    ))}
                  </div>

                  <ValidationMessage name={formOptions.name} />
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
              <div className="flex flex-col gap-6">{renderInput()}</div>

              <div className="flex gap-4">
                <Button
                  size="md"
                  backgroundColor="shark-950"
                  className="app_survey__btn"
                  isLoading={isLoading}
                  type="submit"
                >
                  Next
                </Button>

                <RenderIf condition={questionType !== QuestionType.AGE}>
                  <Button
                    size="md"
                    className="app_survey__btn app_survey__btn--outline"
                    disabled={isLoading}
                    type="button"
                    onClick={handlePrevious}
                  >
                    Previous
                  </Button>
                </RenderIf>
              </div>
            </form>
          )
        }}
      </Formik>
    </div>
  )
}
