'use client'
import { rootColors } from '@/lib/colors'
import React from 'react'
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'
import { RenderIf } from '../render-if'
import { SkeletonLoader } from '@/components/ui/skeleton-loader'

interface IProps {
  data: Array<{ name: string, count: number }>
  isLoading: boolean
}

export default function CarMakeChart (props: IProps) {
  const { data, isLoading } = props

  return (
    <div className="app_bar_chart">
      <RenderIf condition={!isLoading}>
        <div className="app_bar_chart__ctt app__donut__card">
          <h1 className="app__donut__card__title app_bar_chart__ctt__title">
            Car Make Distribution
          </h1>
          <ResponsiveContainer
            width="100%"
            height="100%"
            className="app_bar_chart__ctt__con"
          >
            <BarChart width={500} height={300} data={data}>
              <Tooltip />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Bar dataKey="count" fill={rootColors['shark-500']} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </RenderIf>

      <RenderIf condition={isLoading}>
        <SkeletonLoader height={500} />
      </RenderIf>
    </div>
  )
}
