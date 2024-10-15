import config from '@/lib/config'
import axios, { type AxiosError } from 'axios'

export const dynamic = 'force-dynamic'

const BASE_URL = config.GOOGLE_SHEET_URL

const ERROR_MESSAGE = 'Unable to fetch results'

export async function GET () {
  try {
    const response = await axios.get(BASE_URL)

    if (response.data?.result === 'success') {
      const data = { message: 'Success', sheet: response.data?.data || [] }

      return Response.json({ data })
    }

    throw new Error(ERROR_MESSAGE)
  } catch (err) {
    const error = err as AxiosError

    return Response.json(
      { message: error.response?.statusText ?? error.message ?? ERROR_MESSAGE },
      { status: error.response?.status ?? 500 }
    )
  }
}
