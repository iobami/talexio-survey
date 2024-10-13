'use client'
import React from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import queries from '@/services/queries/auth'
import routes from '@/lib/routes'
import { useRouter } from 'next/navigation'

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Please enter your email address')
})

const initialValues = {
  email: process.env.NEXT_PUBLIC_CLIENT_EMAIL ?? ''
}

type InitialValues = ReturnType<() => typeof initialValues>

export default function Page () {
  const rt = useRouter()
  const { isLoading } = queries.login()

  const onSubmit = () => { rt.push(routes.survey.personalDetails.path) }

  return (
    <div className="app_auth_login_container">
      <div className="app_auth_login_container__upper">
        <div className="app_auth_login">
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
                    <h3 className="app_auth_login__title">
                      Kindly enter your age to get started
                    </h3>
                    <div className="flex flex-col gap-6">
                      <div className="">
                        <Input
                          {...getProps({ name: 'email' })}
                          type="datele"
                          placeholder="Enter your email address"
                          size="xl"
                        />
                      </div>
                    </div>

                    <div className="">
                      <Button
                        size="xl"
                        isLoading={isLoading}
                        backgroundColor="shark-950"
                        className="w-full app_auth_login__btn"
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
