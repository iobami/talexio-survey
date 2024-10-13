import React, { type ReactNode, useContext } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AppContext } from '@/state/context'
import { type QuestionType } from './form'

interface IProps {
  children: ReactNode
  questionType: QuestionType
}

export function Question (props: IProps) {
  const { state } = useContext(AppContext)
  const { questionType, children } = props

  return (
    <AnimatePresence initial={!false}>
      {state.questionType === questionType && (
        <motion.div
          key="content"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={{
            initial: { opacity: 0, y: '500px' },
            animate: { opacity: 1, y: '0' },
            exit: { opacity: 0, y: '-500px' }
          }}
          transition={{ ease: 'easeOut' }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
