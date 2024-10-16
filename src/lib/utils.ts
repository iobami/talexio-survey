import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { rootColors } from './colors'
import { type IGenerateTargetablesData, type IUseGenerateData } from './models'

export function cn (...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const decodeJwt = (jwt: string) => {
  try {
    return JSON.parse(atob(jwt.split('.')[1]))
  } catch (error) {
    return { exp: 0, sessionId: '' }
  }
}

export const testChartData = [
  {
    id: 1,
    title: 'Respondent group by percentage',
    needle: false,
    label: '',
    child: [
      {
        id: 1,
        name: 'Adolescents',
        value: 100,
        color: rootColors['shark-300']
      },
      {
        id: 2,
        name: 'Unlicensed',
        value: 200,
        color: rootColors['shark-500']
      },
      {
        id: 3,
        name: 'First-timers',
        value: 100,
        color: rootColors['shark-800']
      },
      {
        id: 4,
        name: 'Targetables',
        value: 200,
        color: '#A5A6F6'
      }
    ]
  },
  {
    id: 2,
    title: 'Ratio of Legal Advice Given',
    needle: false,
    label: '294 Legal Advice',
    child: [
      {
        id: 1,
        name: 'Legal Advice Giving',
        value: 200,
        color: '#277CFC',
        gradient: {
          start: '#488FF8',
          end: '#AFCFFF'
        }
      },
      { id: 2, name: 'Legal Advice Pending', value: 94, color: '#4198D7' }
    ]
  }
]

function calculatePercentage (val: number, total: number) {
  return Number(((val / total) * 100).toFixed(2)) || 0
}

export function getGroupChartData (params: IUseGenerateData) {
  const {
    adolescents = 0,
    firstTimers = 0,
    targetables = 0,
    unlicensed = 0
  } = params

  const total = adolescents + firstTimers + targetables + unlicensed

  return {
    id: 1,
    title: 'Respondent group by percentage',
    needle: false,
    label: '',
    child: [
      {
        id: 1,
        name: 'Adolescents',
        value: calculatePercentage(adolescents, total),
        color: rootColors['shark-300']
      },
      {
        id: 2,
        name: 'Unlicensed',
        value: calculatePercentage(unlicensed, total),
        color: rootColors['shark-500']
      },
      {
        id: 3,
        name: 'First-timers',
        value: calculatePercentage(firstTimers, total),
        color: rootColors['shark-800']
      },
      {
        id: 4,
        name: 'Targetables',
        value: calculatePercentage(targetables, total),
        color: '#A5A6F6'
      }
    ]
  }
}

export function getTargetablesChartData (params: IGenerateTargetablesData) {
  const {
    caresAboutFuelEmissions = 0,
    doesNotCareAboutFuelEmissions = 0,
    fwd = 0,
    idk = 0
  } = params

  const emissionsTotal =
    caresAboutFuelEmissions + doesNotCareAboutFuelEmissions

  const drivetrainTotal = fwd + idk

  const res = {
    emissions: {
      id: 1,
      title: 'Percentage of targetables that care about fuel emissions',
      needle: false,
      label: '',
      child: [
        {
          id: 1,
          name: 'Cares',
          value: calculatePercentage(caresAboutFuelEmissions, emissionsTotal),
          color: rootColors['shark-300']
        },
        {
          id: 2,
          name: 'Does not care',
          value: calculatePercentage(
            doesNotCareAboutFuelEmissions,
            emissionsTotal
          ),
          color: rootColors['shark-500']
        }
      ]
    },

    drivetrain: {
      id: 2,
      title:
        'Percentage of targetables that picked FWD or “I don’t know” for drivetrain',
      needle: false,
      label: '',
      child: [
        {
          id: 1,
          name: 'FWD',
          value: calculatePercentage(fwd, drivetrainTotal),
          color: rootColors['shark-300']
        },
        {
          id: 2,
          name: 'I don’t know',
          value: calculatePercentage(idk, drivetrainTotal),
          color: rootColors['shark-500']
        }
      ]
    }
  }

  return res
}
