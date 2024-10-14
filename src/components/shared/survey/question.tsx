import React, { type ReactNode, useContext } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AppContext } from '@/state/context'
import { type QuestionType } from './form'

interface IProps {
  children: ReactNode
  questionType: QuestionType
}

const variants = {
  initial: (direction: number) => ({
    opacity: 0,
    y: direction === 1 ? '60vh' : '-60vh'
  }),
  animate: {
    opacity: 1,
    y: 0
  },
  exit: (direction: number) => ({
    opacity: 0,
    y: direction === 1 ? '-60vh' : '60vh'
  })
}

export function Question (props: IProps) {
  const { state } = useContext(AppContext)
  const { questionType, children } = props

  return (
    <AnimatePresence initial mode="popLayout" custom={state.direction}>
      {state.questionType === questionType && (
        <motion.div
          key={state.questionType}
          custom={state.direction}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={variants}
          transition={{ type: 'spring', bounce: 0.05 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
