'use client'

import React, { useMemo } from 'react'
import { Donut } from '@/components/shared/dashboard'
import queries from '@/services/queries/results/kpis'
import targetablesQueries from '@/services/queries/results/targetables'
import {
  type IGenerateTargetablesData,
  type IUseGenerateData
} from '@/lib/models'
import { getGroupChartData, getTargetablesChartData } from '@/lib/utils'
import { SkeletonLoader } from '@/components/ui/skeleton-loader'
import { RenderIf } from '@/components/shared'
import dynamic from 'next/dynamic'

const BarChart = dynamic(
  async () => await import('../../components/shared/dashboard/bar-chart')
)

function generateTargetablesData (params: IGenerateTargetablesData) {
  const res = getTargetablesChartData(params)
  return res
}

function generateGroupData (params: IUseGenerateData) {
  const res = getGroupChartData(params)
  return res
}

const useKpis = () => {
  const { data, isLoading } = queries.read()

  return useMemo(
    () => ({
      count: [
        { label: 'Adolescents', value: data?.adolescents ?? 0 },
        { label: 'Unlicensed', value: data?.unlicensed ?? 0 },
        { label: 'First timers', value: data?.firstTimers ?? 0 },
        { label: 'Targetables', value: data?.targetables ?? 0 }
      ],
      chart: generateGroupData({
        adolescents: data?.adolescents,
        firstTimers: data?.firstTimers,
        targetables: data?.targetables,
        unlicensed: data?.unlicensed
      }),
      isLoading
    }),
    [data, isLoading]
  )
}

const useTargetables = () => {
  const { data, isLoading } = targetablesQueries.read()

  return useMemo(
    () => ({
      ...generateTargetablesData({
        caresAboutFuelEmissions: data?.caresAboutFuelEmissions,
        doesNotCareAboutFuelEmissions: data?.doesNotCareAboutFuelEmissions,
        fwd: data?.drivetrain?.FWD,
        idk: data?.drivetrain?.IDK,
        carDistribution: data?.carDistribution
      }),
      isLoading
    }),
    [data, isLoading]
  )
}

export default function Page () {
  queries.read()
  const { data, isLoading } = targetablesQueries.read()

  const kpis = useKpis()
  const targetables = useTargetables()

  return (
    <div className="app_dashboard_page app_dashboard_home flex flex-col gap-8">
      <div className="app_dashboard_home__header">
        <div className="app_dashboard_home__header__profile_con app_dashboard_page__px">
          <div className="app_dashboard_home__header__profile">
            <h4 className="app_dashboard_home__header__profile__h4">Welcome</h4>
          </div>
        </div>

        <div className="app_dashboard_home__kpis grid grid-cols-2 md:grid-cols-4 app_dashboard_page__px">
          {kpis?.count?.map((item, index) => {
            const IS_TARGET = kpis?.count?.length === index + 1

            return (
              <div
                className={`app_dashboard_home__kpis__item ${
                  IS_TARGET ? 'app_dashboard_home__kpis__item--target' : ''
                } ${
                  kpis.isLoading
                    ? 'app_dashboard_home__kpis__item--loading'
                    : ''
                }`}
                key={index}
              >
                <RenderIf condition={!kpis.isLoading}>
                  <h6 className="app_dashboard_home__kpis__item__h6">
                    {item.label}
                  </h6>

                  <p className="app_dashboard_home__kpis__item__value">
                    {item.value}
                  </p>
                </RenderIf>
                <RenderIf condition={kpis?.isLoading}>
                  <SkeletonLoader />
                </RenderIf>
              </div>
            )
          })}
        </div>
      </div>

      <div className="app_dashboard_home__donut__ctt">
        <Donut data={kpis?.chart} isLoading={kpis.isLoading} />

        <Donut data={targetables.emissions} isLoading={targetables.isLoading} />

        <Donut
          data={targetables.drivetrain}
          isLoading={targetables.isLoading}
        />
      </div>

      <div className="app_dashboard_home__ctt">
        <RenderIf condition={isLoading}>
          <SkeletonLoader height={70} />
        </RenderIf>

        <RenderIf condition={!isLoading}>
          <div className="app__donut__card">
            <h1 className="app__donut__card__title">
              The average amount of cars in a family is{' '}
              {data?.averageCarsPerFamily ?? 0}
            </h1>
          </div>
        </RenderIf>
      </div>

      <div className="app_dahsboard_home__bar__chart">
        <BarChart
          data={targetables.carDistribution}
          isLoading={targetables.isLoading}
        />
      </div>
      <br />
    </div>
  )
}
