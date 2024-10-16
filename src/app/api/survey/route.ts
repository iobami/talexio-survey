import config from '@/lib/config'
import { type AppState } from '@/state/state'
import axios, { type AxiosError } from 'axios'

export const dynamic = 'force-dynamic'

const BASE_URL = config.GOOGLE_SHEET_URL

const ERROR_MESSAGE = 'Unable to fetch results'

export async function POST (request: Request) {
  try {
    const requestBody = (await request.json()) as AppState['formData']

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
