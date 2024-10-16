import { type AxiosError } from 'axios'
import { type ToastOptions, toast } from 'react-toastify'

export const setLocalStorage = (key: string, data: any) => {
  try {
    const jsonData = JSON.stringify(data)
    localStorage.setItem(key, jsonData)
    return true
  } catch (error) {
    return false
  }
}

export const getLocalStorage = (key: string) => {
  try {
    const jsonData = localStorage.getItem(key)
    if (!jsonData) return null
    return JSON.parse(jsonData)
  } catch (error) {
    return null
  }
}

export const getQueryKeys = (namespace: string) => ({
  create: `${namespace}/create`,
  read: `${namespace}/read`,
  readOne: `${namespace}/readOne`,
  update: `${namespace}/update`,
  patch: `${namespace}/patch`,
  put: `${namespace}/put`,
  delete: `${namespace}/delete`
})

export function handleSuccess (data: any, message: string) {
  return data?.description || message
}

export function handleErrors (error: AxiosError) {
  const MSG = 'Something went wrong'

  let errorMessage = ''

  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    errorMessage = (error.response?.data as any)?.message
    const data = error.response?.data as any

    if (typeof data === 'string') return data || MSG

    const errors = data?.responseData

    if (errors?.length) {
      const [err] = errors
      return err.errorMessage ?? MSG
    }

    if (typeof errorMessage === 'string') {
      return errorMessage
    }

    return MSG
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    errorMessage = error.request?.message
    if (errorMessage) {
      return errorMessage
    }
  }

  return error.message || MSG
}

export const errorToast = (
  message = 'Something went wrong',
  options?: ToastOptions | undefined
) => {
  toast.error(message, { ...options, toastId: message })
}

export const successToast = (
  message = 'Successful',
  options?: ToastOptions | undefined
) => {
  toast.success(message, options)
}
