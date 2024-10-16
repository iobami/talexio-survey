import { type AppState } from '@/state/state'
import { getKpis, getTargetables, validateFormData } from '.'
import mocks from '../mocks'

describe('getKpis', () => {
  it('should return the correct number of groups KPIs', () => {
    const kpis = getKpis(mocks.sheet)

    expect(kpis.adolescents).toBe(6) // Assert that the adolescents count is 6
    expect(kpis.unlicensed).toBe(3) // Assert that the unlicensed count is 3
    expect(kpis.firstTimers).toBe(4) // Assert that the firstTimers count is 4
    expect(kpis.targetables).toBe(3) // Assert that the targetables count is 3
  })
})

describe('getTargetables', () => {
  it('should return the correct number targetables', () => {
    const kpis = getTargetables(mocks.sheet)

    const totalDrivetrain = kpis.drivetrain.FWD + kpis.drivetrain.RWD + kpis.drivetrain.IDK

    expect(kpis.total).toBe(totalDrivetrain) // Assert that the total targetables users count is total drive train
    expect(kpis.drivetrain.IDK).toBe(2) // Assert that the total drivetrain users selected IDK count is 2
  })
})

describe('validateFormData', () => {
  it('should return same body if valid', async () => {
    const data = {
      familyCars: 2,
      fuelEmissions: 'No',
      drivetrain: 'FWD',
      firstCar: 'No',
      hasLicense: 'Yes',
      gender: 'M',
      age: 27
    }

    const result = await validateFormData(data as AppState['formData'])

    expect(result).toMatchObject(data)
  })

  it('should require age if undefined', async () => {
    const data = {
      familyCars: 2,
      fuelEmissions: 'No',
      drivetrain: 'FWD',
      firstCar: 'No',
      hasLicense: 'Yes',
      gender: 'M',
      age: undefined
    }

    const result = await validateFormData(data as AppState['formData'])

    expect((result as any).message).toBe('Please enter your age')
  })

  it('should validate max age if more than 100', async () => {
    const data = {
      familyCars: 2,
      fuelEmissions: 'No',
      drivetrain: 'FWD',
      firstCar: 'No',
      hasLicense: 'Yes',
      gender: 'M',
      age: 101
    }

    const result = await validateFormData(data as AppState['formData'])

    expect((result as any).message).toBe('age must be less than or equal to 100')
  })

  it('should validate min age if less than 0', async () => {
    const data = {
      familyCars: 2,
      fuelEmissions: 'No',
      drivetrain: 'FWD',
      firstCar: 'No',
      hasLicense: 'Yes',
      gender: 'M',
      age: -101
    }

    const result = await validateFormData(data as AppState['formData'])

    expect((result as any).message).toBe('age must be greater than or equal to 0')
  })

  it('should require gender if empty', async () => {
    const data = {
      gender: '',
      age: 16
    }

    const result = await validateFormData(data as AppState['formData'])

    expect((result as any).message).toBe('Please select your gender')
  })
})
