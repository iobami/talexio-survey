'use client'
import React, { useState } from 'react'
import { FieldArray, Formik } from 'formik'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import ValidationMessage from '@/components/ui/validation-message'
import { useAppContext } from '@/state/context'
import { updateDirection, updateFormData, updateQuestionType } from '@/state/reducer'
import queries from '@/services/queries/survey'
import { initialAppState } from '@/state/state'
import { QuestionType } from '@/lib/form'
import requirements, { Options as CarMakeOptions } from '@/lib/form/car-make'

const defaultValues = {
  carMake: '' as CarMakeOptions,
  modelName: ''
}

export interface InitialValues {
  cars: Array<typeof defaultValues>
}

export default function CarMake () {
  const { dispatch, state } = useAppContext()

  const [isComplete, setIsComplete] = useState(false)

  const { validationSchema } = requirements

  const { mutate, isLoading } = queries.create({
    onSuccess: () => {
      handleComplete()
    }
  })

  const initialValues: InitialValues = {
    cars: Array(state.formData.familyCars ?? 0).fill(defaultValues)
  }

  const onSubmit = (_values: InitialValues) => {
    mutate({ ...state.formData, carMakeAndModelName: JSON.stringify(_values.cars) })
  }

  const handleRestart = () => {
    dispatch(updateDirection(-1))
    dispatch(updateQuestionType(QuestionType.AGE))
    setIsComplete(false)
  }

  const handlePrevious = () => {
    dispatch(updateDirection(-1))
    dispatch(updateQuestionType(state.questionType - 1))
  }

  const handleComplete = () => {
    dispatch(updateFormData(initialAppState.formData))
    setIsComplete(true)
  }

  if (isComplete) {
    return (
      <div className="flex flex-col gap-8">
        <h3 className="app_survey__title">
          {'Thanks for taking time to fill this survey!'}
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
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(props) => {
        const {
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue
        } = props

        const getProps = (args: { name: string }) => {
          const name = args.name

          return {
            name,
            id: name,
            value: values[name as keyof typeof initialValues],
            onChange: handleChange,
            onBlur: handleBlur
          }
        }

        return (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-10 pb-10 mb-10"
          >
            <h3 className="app_survey__title">Select car make and model</h3>
            <FieldArray
              name="cars"
              render={() => (
                <div className="app_survey__car_make_con flex flex-col gap-8">
                  {values?.cars?.length > 0 &&
                    values?.cars?.map((item, index) => {
                      const { value, ...dropdownProps } = getProps({
                        name: `cars[${index}].carMake`
                      })
                      const selectedValue = value ? String(value) : undefined

                      return (
                        <div key={index} className="flex flex-col gap-4">
                          <p className="app_survey__small__title">
                            Car #{index + 1}
                          </p>
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
                                <SelectValue placeholder="Select car make" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  {Object.entries(CarMakeOptions).map(
                                    ([label, value]) => (
                                      <SelectItem key={label} value={value}>
                                        {label}
                                      </SelectItem>
                                    )
                                  )}
                                </SelectGroup>
                              </SelectContent>
                            </Select>

                            <ValidationMessage
                              name={`cars[${index}].carMake`}
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <Input
                              {...getProps({
                                name: `cars[${index}].modelName`
                              })}
                              value={item.modelName}
                              placeholder="Enter model name"
                              size="xl"
                            />
                            <ValidationMessage
                              name={`cars[${index}].modelName`}
                            />
                          </div>
                        </div>
                      )
                    })}
                </div>
              )}
            />

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

              <Button
                size="md"
                className="app_survey__btn app_survey__btn--outline"
                disabled={isLoading}
                type="button"
                onClick={handlePrevious}
              >
                Previous
              </Button>
            </div>
          </form>
        )
      }}
    </Formik>
  )
}
