import config from '@/lib/config'
import { validateFormData } from '@/lib/survey'
import { type AppState } from '@/state/state'
import axios, { type AxiosError } from 'axios'

export const dynamic = 'force-dynamic'

const BASE_URL = config.GOOGLE_SHEET_URL

const ERROR_MESSAGE = 'Unable to create record'

export async function POST (request: Request) {
  try {
    const requestBody = (await request.json()) as AppState['formData']

    const values: any = await validateFormData(requestBody)

    if (Array.isArray(values.inner) && values.inner.length) {
      const innerErrors = values.inner as Array<{ path: string, message: string }>
      const errorResponse = innerErrors.map((item) => ({ path: item.path, message: item.message }))

      return Response.json(
        { message: ERROR_MESSAGE, errors: errorResponse },
        { status: 400 }
      )
    }

    const formData = new FormData()

    Object.entries(requestBody).forEach(([key, value]) => {
      formData.append(key, value as string)
    })

    const res = await axios.post(BASE_URL, formData)

    if (res.data.result === 'success') {
      return Response.json({ data: { message: 'Success' } })
    }

    throw new Error(ERROR_MESSAGE)
  } catch (err: any) {
    const error = err as AxiosError

    return Response.json(
      { message: error.response?.statusText ?? error.message ?? ERROR_MESSAGE },
      { status: error.response?.status ?? 500 }
    )
  }
}
