'use client'

import { useEffect, useState } from 'react'
import {
  usePathname,
  useSelectedLayoutSegments
} from 'next/navigation'
import { ArrowRightToBracket } from '../svgs'
import Link from 'next/link'
import routes from '@/lib/routes'

function capitalizeFirstLetter (text: string) {
  return text.replace(/\b\w/g, function (char) {
    return char.toUpperCase()
  })
}

const useBreadcrumb = () => {
  const segments = useSelectedLayoutSegments()

  let title = 'Dashboard'

  if (segments.length) {
    const sgt = segments[0]

    title = capitalizeFirstLetter(sgt).replace('-', ' ')

    return <span>{title}</span>
  }

  return <span>{title}</span>
}

export function Header () {
  const bread = useBreadcrumb()
  const pt = usePathname()

  const [, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [pt])

  return (
    <header className="app_dash_main__hdr">
      <div className="app_dash_main__hdr__title">{bread}</div>

      <div className="app_dash_main__hdr__rgt">
        <div className="flex items-center gap-4">
          <Link href={routes.home.path}>
            <ArrowRightToBracket />
          </Link>
        </div>
      </div>
    </header>
  )
}
