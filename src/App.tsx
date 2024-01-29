import { useEffect } from 'react'

import styles from './App.module.css'
import Editor from './features/editor/Editor.tsx'
import Preview from './features/editor/Preview.tsx'
import { useAppDispatch } from './app/hooks.ts'
import { updateStatus } from './features/editor/editorSlice.ts'

// Ensure storage listeners are loaded
import './features/editor/storage.ts'

function App() {
  const dispatch = useAppDispatch()

  // trigger start of application
  useEffect(
    () => {
      dispatch(
        updateStatus('initializing')
      )
    },
    [dispatch],
  )

  return (
    <div className={styles.container}>
      <h1 className={styles['page-title']}>
        Markdown Editor
      </h1>

      <Editor />

      <Preview />
    </div>
  )
}

export default App
