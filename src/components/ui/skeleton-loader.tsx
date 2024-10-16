import React from 'react'

interface IProps {
  height?: number
}

function SkeletonLoader (props: IProps) {
  const { height = 110 } = props
  return (
    <div className="">
      <div
        className="app_skeleton_loader"
        style={{ height: `${height}px` }}
      ></div>
    </div>
  )
}

export { SkeletonLoader }
