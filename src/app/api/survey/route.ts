import config from '@/lib/config'
import { type AppState } from '@/state/state'
import { type AxiosError } from 'axios'

export const dynamic = 'force-dynamic'

const BASE_URL = config.GOOGLE_SHEET_URL

export async function POST (request: Request) {
  try {
    const requestBody = (await request.json()) as AppState['formData']

    const formData = new FormData()

    Object.entries(requestBody).forEach(([key, value]) => {
      formData.append(key, value as string)
    })

    const res = await fetch(BASE_URL, {
      method: 'POST',
      body: formData
    }).then(async res => {
      if (!res.ok) {
        throw new Error('Network response was not ok')
      }

      return await res.json()
    })

    if (res.result === 'success') {
      return Response.json({ data: { message: 'Success' } })
    }

    throw new Error('Unable to create')
  } catch (err: any) {
    const error = err as AxiosError

    return Response.json(
      { message: error.response?.statusText ?? error.message ?? 'Unable to create' },
      { status: error.response?.status ?? 500 }
    )
  }
}
