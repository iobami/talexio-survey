import { getKpis, getTargetables } from '.'
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
