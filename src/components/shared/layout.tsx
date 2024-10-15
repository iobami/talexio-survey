'use client'

import Link from 'next/link'
import React, { type ReactNode } from 'react'
import { ArrowLeft } from './svgs'
import routes from '@/lib/routes'
import { usePathname } from 'next/navigation'

interface IProps {
  children: ReactNode
}

export function Layout (props: IProps) {
  const { children } = props

  const pathname = usePathname()

  const IS_HOME_PAGE = pathname === routes.home.path

  return (
    <div className="app_survey_layout">
      <div className="app_survey_layout__bg"></div>
      <div className="app_survey_layout__cct relative">
        {!IS_HOME_PAGE && (
          <Link className="app_survey_layout__bg__cct__back" href={routes.home.path}>
            <ArrowLeft />
          </Link>
        )}

        <div className="app_survey_layout__cct__con">{children}</div>
      </div>
    </div>
  )
}
