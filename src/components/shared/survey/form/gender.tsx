import React, { useContext } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { AppContext } from '@/state/context'
import { updateFormData, updateQuestionNumber } from '@/state/reducer'

const validationSchema = Yup.object().shape({
  gender: Yup.string().required('Please select your gender')
})

const initialValues = {
  gender: ''
}

type InitialValues = ReturnType<() => typeof initialValues>

export function Gender () {
  const { dispatch, state } = useContext(AppContext)

  const onSubmit = (values: InitialValues) => {
    dispatch(updateFormData(values))
    dispatch(updateQuestionNumber(state.questionNumber + 1))
  }

  return (
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
              <h3 className="app_survey__title">Select your gender</h3>
              <div className="flex flex-col gap-6">
                <div className="">
                  <Input
                    {...getProps({ name: 'gender' })}
                    type="text"
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
