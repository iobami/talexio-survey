import { type InitialValues } from '@/components/shared/survey/form/car-make'
import config from '@/lib/config'
import axios, { type AxiosError } from 'axios'
import { type SurveyKpis } from './types'

export const dynamic = 'force-dynamic'

const BASE_URL = config.GOOGLE_SHEET_URL

const ERROR_MESSAGE = 'Unable to fetch results'

type TCarMakeAndModel = InitialValues['cars']

function getCarMakeAndModelName (carMakeAndModelName: string): (TCarMakeAndModel | undefined) {
  try {
    return JSON.parse(carMakeAndModelName)
  } catch (error) {
    return undefined
  }
}

function getKpis (sheet: any): SurveyKpis {
  let adolescents = 0
  let unlicensed = 0
  let firstTimers = 0
  let targetables = 0

  try {
    // Loop through the data (excluding headers in row 1)
    for (let counter = 1; counter < sheet.length; counter++) {
      const age = Number(sheet[counter][0])
      const hasLicense = String(sheet[counter][2])
      const firstCar = String(sheet[counter][3])
      const carMakeAndModelName = getCarMakeAndModelName(sheet[counter][sheet[counter].length - 1])

      if (age < 18) adolescents++
      if (hasLicense.toLowerCase() === 'no') unlicensed++

      if (
        (age >= 18 && age <= 25) &&
        firstCar.toLowerCase() === 'yes'
      ) {
        firstTimers++
      }

      if (carMakeAndModelName?.length) targetables++
    }

    return { adolescents, unlicensed, firstTimers, targetables }
  } catch (error) {
    return { adolescents, unlicensed, firstTimers, targetables }
  }
}

export async function GET () {
  try {
    const response = await axios.get(BASE_URL)

    if (response.data?.result === 'success') {
      const sheet = response.data?.data || []

      const data = {
        message: 'Success',
        kpis: getKpis(sheet)
      }

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
