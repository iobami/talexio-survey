import config from '@/lib/config'
import api from '@/services/api'
import { type AppState } from '@/state/state'
import { type AxiosError } from 'axios'

export const dynamic = 'force-dynamic'

const BASE_URL = config.GOOGLE_SHEET_URL

export async function POST (request: Request) {
  try {
    const requestBody = (await request.json()) as AppState['formData']
    let body: Partial<AppState['formData']> = {}

    if ((requestBody.age ?? 0) < 18) {
      body = {
        age: requestBody.age,
        gender: requestBody.gender
      }
    }

    const res = await api.post({ url: `${BASE_URL}`, body })
    const data = await res.json()

    return Response.json({ data })
  } catch (err: any) {
    const error = err as AxiosError

    return Response.json(
      { message: error.response?.statusText ?? 'Unable to create' },
      { status: error.response?.status }
    )
  }
}
