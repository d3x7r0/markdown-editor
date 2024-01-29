import { updateStatus, updateText } from './editorSlice.ts'
import { startAppListening } from '../../app/hooks.ts'

export const STORAGE_KEY = 'markdown-data'

const DEBOUNCE_TIME = 180

// Listen to changes to store in localStorage
startAppListening({
  actionCreator: updateText,
  effect: async (_, listenerApi) => {
    const status = listenerApi.getState().editor.status

    // Do nothing until ready
    if (status !== 'ready') {
      return
    }

    // Cancel any in-progress instances of this listener
    listenerApi.cancelActiveListeners()

    // Delay to debounce saves
    await listenerApi.delay(DEBOUNCE_TIME)

    // Save data
    const value = listenerApi.getState().editor.value

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
  effect: (action, listenerApi) => {
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

      const parsed: unknown = JSON.parse(raw)
      if (!parsed) {
        return
      }

      listenerApi.dispatch(
        updateText(parsed as string),
      )
    } catch (err) {
      // TODO: handle error
    } finally {
      listenerApi.dispatch(
        updateStatus('ready'),
      )
    }
  },
})
