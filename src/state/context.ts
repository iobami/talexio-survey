import React from 'react'
import { type AppState, initialAppState } from './state'
import { type AppActions } from './actions'

export const AppContext = React.createContext<{
  state: AppState
  dispatch: React.Dispatch<AppActions>
}>({
  state: initialAppState,
  dispatch: () => undefined
})
