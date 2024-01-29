import { updateStatus, updateText } from './editorSlice.ts'
import { startAppListening } from '../../app/hooks.ts'

export const STORAGE_KEY = 'markdown-data'

const DEBOUNCE_TIME = 180

// Listen to changes to store in localStorage
startAppListening({
  actionCreator: updateText,
  effect: async (_, listenerApi) => {
    const { getState, cancelActiveListeners, delay } = listenerApi

    const status = getState().editor.status

    // Do nothing until ready
    if (status !== 'ready') {
      return
    }

    // Cancel any in-progress instances of this listener
    cancelActiveListeners()

    // Delay to debounce saves
    await delay(DEBOUNCE_TIME)

    // Save data
    const value = getState().editor.value

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(value),
      )
    } catch (error) {
      // TODO: handle error
    }
  },
})

// Setup initial state by loading from storage
startAppListening({
  actionCreator: updateStatus,
  effect: async (action, listenerApi) => {
    const { dispatch } = listenerApi

    // Only run when changing to the `initializing` state
    if (action.payload !== 'initializing') {
      return
    }

    // Load from storage
    try {
      const raw = localStorage.getItem(STORAGE_KEY)

      if (!raw) {
        return
      }

      const parsed = JSON.parse(raw)
      if (!parsed) {
        return
      }

      dispatch(
        updateText(parsed),
      )
    } catch (err) {
      // TODO: handle error
    } finally {
      dispatch(
        updateStatus('ready'),
      )
    }
  },
})
