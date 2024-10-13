'use client'

import routes from '@/lib/routes'
import Link from 'next/link'

import {
  Grid
} from '..'
import { useIsActive } from '@/hooks/use-active-route'

const dr = routes.dashboard

const menuItems = [
  {
    label: 'Dashboard',
    icon: <Grid />,
    href: dr.entry.path
  }
]

interface ISidebarItem {
  item: {
    label: string
    href: string
    icon: JSX.Element
  }
}

const SidebarItem = (props: ISidebarItem) => {
  const { item } = props
  const { isActive } = useIsActive()

  const activeCN = isActive(item?.href) ? 'active' : ''

  return (
    <div className={`app_dash_main__aside__links__item ${activeCN}`}>
      <Link
        className={`app_dash_main__aside__links__item__a ${''}`}
        href={item?.href}
      >
        <div className="app_dash_main__aside__links__item__ctt">
          {item?.icon}

          <p className="app_dash_main__aside__links__item__ctt__p">
            {item?.label}
          </p>
        </div>
      </Link>
    </div>
  )
}

export function Sidebar ({ mobile = false }) {
  return (
    <aside
      className={`app_dash_main__aside app_dash_main__aside--${
        mobile && 'mobile'
      }`}
    >
      <div className="app_dash_main__aside__top">
        <div className="w-full px-6">
          <Link href={routes.dashboard.entry.path}>
            <div className="flex items-center gap-3">
              <h2 className="app_survey_container__header__logo__title">
                Talexio
              </h2>
            </div>
          </Link>
        </div>

        <div className="app_dash_main__aside__links">
          {menuItems.map((item) => (
            <SidebarItem key={item.label} item={item} />
          ))}
        </div>
      </div>
    </aside>
  )
}
