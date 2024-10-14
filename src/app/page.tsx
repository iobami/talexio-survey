import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home () {
  return (
    <div className="app_survey_container">
      <div className="app_survey_container__upper">
        <div className="flex flex-col gap-8">
          <h3 className="app_survey__title">
            Welcome to Our Automotive Sales Survey!
          </h3>

          <p className="app_survey__info">
            We appreciate your time and feedback as we work to better understand
            our customers&apos; needs. This survey is designed to be quick and
            easy, with no interruptions or delays, so you can share your
            thoughts seamlessly.
          </p>

          <div className="flex gap-4">
            <Link href={'/survey'}>
              <Button
                size="md"
                backgroundColor="shark-950"
                className="app_survey__btn"
                // onClick={handleRestart}
              >
                Start survey
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
