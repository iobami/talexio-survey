'use client'
import React from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const validationSchema = Yup.object().shape({
  age: Yup.number()
    .min(0)
    .max(100)
    .required('Please enter your age')
})

const initialValues = {
  age: 0
}

type InitialValues = ReturnType<() => typeof initialValues>

export default function Page () {
  const [quetionNumber, setQuestionNumber] = React.useState(0)

  const onSubmit = () => {
    setQuestionNumber(quetionNumber + 1)
  }

  return (
    <div className="app_survey_container">
      <div className="app_survey_container__upper">
        <div className="app_survey">
          <div>
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
                  errors,
                  touched
                } = props

                const getProps = (args: { name: keyof InitialValues }) => {
                  const name = args.name

                  return {
                    name,
                    id: name,
                    value: values[name],
                    onChange: handleChange,
                    onBlur: handleBlur,
                    errors,
                    touched
                  }
                }

                return (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                    <h3 className="app_survey__title">
                      Kindly enter your age to get started
                    </h3>
                    <div className="flex flex-col gap-6">
                      <div className="">
                        <Input
                          {...getProps({ name: 'age' })}
                          type="number"
                          placeholder="Enter your age"
                          size="xl"
                        />
                      </div>
                    </div>

                    <div className="">
                      <Button
                        size="md"
                        backgroundColor="shark-950"
                        className="app_survey__btn"
                      >
                        Next
                      </Button>
                    </div>
                  </form>
                )
              }}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  )
}
