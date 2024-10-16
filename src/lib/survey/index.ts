import { type SurveyKpis } from '@/app/api/results/kpis/types'
import { type Targetables } from '@/app/api/results/targetables/types'
import { type InitialValues } from '@/components/shared/survey/form/car-make'
import { type Options as DrivetrainOptions } from '@/lib/form/drivetrain'
import { type AppState } from '@/state/state'
import formSchema from '../form/form-schema'

type TCarMakeAndModel = InitialValues['cars']

function getCarMakeAndModelName (carMakeAndModelName: string): (TCarMakeAndModel | undefined) {
  try {
    return JSON.parse(carMakeAndModelName)
  } catch (error) {
    return undefined
  }
}

export function getKpis (sheet: any): SurveyKpis {
  let adolescents = 0
  let unlicensed = 0
  let firstTimers = 0
  let targetables = 0

  try {
    // Loop through the data (excluding headers in row 1)
    for (let counter = 1; counter < sheet.length; counter++) {
      const age = Number(sheet[counter][0])
      const hasLicense = String(sheet[counter][2])
      const isFirstCar = String(sheet[counter][3]).toLowerCase() === 'yes'
      const carMakeAndModelName = getCarMakeAndModelName(sheet[counter][sheet[counter].length - 1])

      if (age < 18) adolescents++
      if (hasLicense.toLowerCase() === 'no') unlicensed++

      if (
        (age >= 18 && age <= 25) &&
        isFirstCar
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

export function getTargetables (sheet: any): Targetables {
  let total = 0
  let totalNumberOfCars = 0
  let averageCarsPerFamily = 0

  let caresAboutFuelEmissions = 0
  let doesNotCareAboutFuelEmissions = 0

  let FWD = 0
  let RWD = 0
  let IDK = 0

  try {
    // Loop through the data (excluding headers in row 1)
    for (let counter = 1; counter < sheet.length; counter++) {
      const drivetrainType = String(sheet[counter][4]) as `${DrivetrainOptions}`
      const userCaresAboutFuelEmissions = String(sheet[counter][5]).toLowerCase() === 'yes'
      const carMakeAndModelName = getCarMakeAndModelName(sheet[counter][sheet[counter].length - 1])
      const isTargetable = !!carMakeAndModelName?.length

      if (isTargetable) {
        total++
        totalNumberOfCars = totalNumberOfCars + carMakeAndModelName.length

        if (userCaresAboutFuelEmissions) {
          caresAboutFuelEmissions++
        } else {
          doesNotCareAboutFuelEmissions++
        }

        if (drivetrainType === 'FWD') FWD++
        if (drivetrainType === 'RWD') RWD++
        if (drivetrainType === 'IDK') IDK++
      }
    }

    averageCarsPerFamily = totalNumberOfCars / total
    const drivetrain = { FWD, RWD, IDK }

    return { total, totalNumberOfCars, averageCarsPerFamily, caresAboutFuelEmissions, doesNotCareAboutFuelEmissions, drivetrain }
  } catch (error) {
    const drivetrain = { FWD, RWD, IDK }

    return { total, totalNumberOfCars, averageCarsPerFamily, caresAboutFuelEmissions, doesNotCareAboutFuelEmissions, drivetrain }
  }
}

export async function validateFormData (formData: AppState['formData']) {
  try {
    const age = formData?.age ?? 0

    if (age < 18) {
      return await formSchema.adolescentsSchema.validate(formData, { abortEarly: false })
    } else if (formData.hasLicense?.toLowerCase() === 'no') {
      return await formSchema.unlicensedSchema.validate(formData, { abortEarly: false })
    } else if ((age >= 18 && age <= 25) && formData.firstCar?.toLowerCase() === 'yes') {
      return await formSchema.firstTimersSchema.validate(formData, { abortEarly: false })
    } else {
      return await formSchema.mainSchema.validate(formData, { abortEarly: false })
    }
  } catch (error) {
    return error
  }
}
