'use client'

import queries from '@/services/queries/results/kpis'
import React, { useMemo } from 'react'

const useKpis = () => {
  const { data } = queries.read()

  return useMemo(() => ([
    { label: 'Adolescents', value: data?.adolescents ?? 0 },
    { label: 'Unlicensed', value: data?.unlicensed ?? 0 },
    { label: 'First timers', value: data?.firstTimers ?? 0 },
    { label: 'Targetables', value: data?.targetables ?? 0 }
  ]), [data])
}

export default function Page () {
  queries.read()

  const kpis = useKpis()

  return (
    <div className="app_dashboard_page app_dashboard_home">
      <div className="app_dashboard_home__header">
        <div className="app_dashboard_home__header__profile_con app_dashboard_page__px">
          <div className="app_dashboard_home__header__profile">
            <h4 className="app_dashboard_home__header__profile__h4">Welcome</h4>
          </div>
        </div>

        <div className="app_dashboard_home__kpis grid grid-cols-4 app_dashboard_page__px">
          {kpis.map((item, index) => {
            const IS_WALLET = kpis.length === index + 1

            return (
              <div className={`app_dashboard_home__kpis__item ${IS_WALLET ? 'app_dashboard_home__kpis__item--wallet' : ''}`} key={index}>
                <h6 className="app_dashboard_home__kpis__item__h6">{item.label}</h6>

                <p className="app_dashboard_home__kpis__item__value">{item.value}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
