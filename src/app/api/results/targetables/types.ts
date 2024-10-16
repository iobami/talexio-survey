import { type Options as CarMakeOptions } from '@/lib/form/car-make'

export interface Targetables {
  total: number
  totalNumberOfCars: number
  averageCarsPerFamily: number
  caresAboutFuelEmissions: number
  doesNotCareAboutFuelEmissions: number
  drivetrain: {
    FWD: number
    RWD: number
    IDK: number
  }
  carDistribution: Record<CarMakeOptions, string[]>
}
