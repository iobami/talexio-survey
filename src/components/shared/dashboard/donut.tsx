import React, { Fragment, useState } from 'react'
import { PieChart, Cell, Pie, Sector } from 'recharts'
import { Text } from '@visx/text'
import { type DonutDataType } from '@/lib/models'

interface IProps {
  data: DonutDataType[0]
}

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    name,
    color,
    value,
    cornerRadius,
    label
  } = props
  const sin = Math.sin(-RADIAN * midAngle)
  const cos = Math.cos(-RADIAN * midAngle)
  const sx = cx + (outerRadius + 1) * cos
  const sy = cy + (outerRadius + 1) * sin
  const mx = cx + (outerRadius + 3) * cos
  const my = cy + (outerRadius + 3) * sin
  const ex = mx + (cos >= 0 ? 1 : -1) * 22
  const ey = my
  const textAnchor = cos >= 0 ? 'start' : 'end'
  const centerTextPos = cy - 6
  return (
    <g>
      <Text
        x={cx}
        y={centerTextPos}
        dy={18}
        textAnchor="middle"
        fill="#000"
        style={{ fontSize: '10px', fontWeight: 500 }}
        width={25}
      >
        {label}
      </Text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        cornerRadius={cornerRadius}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke="#CDCDCD"
        fill="none"
        strokeDasharray="0.71 0.71"
      />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 3}
        y={ey}
        textAnchor={textAnchor}
        style={{ fontSize: '8px' }}
        fill={color}
      >
        {value}%
      </text>
      <Text
        x={ex + (cos >= 0 ? 1 : -1) * -15}
        y={ey}
        dy={10}
        textAnchor={textAnchor}
        fill="#999"
        style={{ fontSize: '8px' }}
        id="rectResize"
      >
        {name}
      </Text>
    </g>
  )
}

export const Donut = (props: IProps) => {
  const { data } = props
  const [activeIndex, setActiveIndex] = useState(0)

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index)
  }
  const { label } = data
  const cx = '50%'
  const cy = '50%'
  const iR = 30
  const oR = 65
  return (
    <div className="app__donut__card">
      <h1 className="app__donut__card__title">{data.title}</h1>
      <div className="app__donut__card__chart flex justify-center">
        <PieChart
          width={250}
          height={250}
          margin={{ top: 35, left: 80, right: 80, bottom: 35 }}
        >
          <defs>
            {data.child.map((entry, index) => {
              const comboId = `${index}${data.id}`
              return (
                <Fragment key={index}>
                  <linearGradient id={`myGradient${comboId}`}>
                    <stop
                      offset="0%"
                      stopColor={entry.gradient?.start ?? entry.color}
                    />
                    <stop
                      offset="100%"
                      stopColor={entry.gradient?.end ?? entry.color}
                    />
                  </linearGradient>
                </Fragment>
              )
            })}
          </defs>
          <Pie
            dataKey="value"
            startAngle={360}
            endAngle={0}
            activeIndex={activeIndex}
            activeShape={(pp: any) => renderActiveShape({ ...pp, label })}
            data={data.child}
            cx={cx}
            cy={cy}
            innerRadius={iR}
            outerRadius={oR}
            fill="#8884d8"
            stroke="none"
            paddingAngle={7}
            cornerRadius={7}
            onMouseEnter={onPieEnter}
          >
            {data.child.map((_entry, index) => {
              const comboId = `${index}${data.id}`
              return (
                <Cell
                  key={`cell-${comboId}`}
                  fill={`url(#myGradient${comboId})`}
                />
              )
            })}
          </Pie>
        </PieChart>
      </div>
      <div className="flex flex-col gap-2">
        {data.child.map((legend, i) => (
          <div key={i} className="app__donut__card__legend">
            <div
              className="app__donut__card__legend__dot"
              style={{ backgroundColor: legend.color }}
            />
            <p className="app__donut__card__legend__text">
              {legend.name} - <span>{legend.value}%</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
