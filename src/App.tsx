import styles from './App.module.css'
import Editor from './features/editor/Editor.tsx'
import Preview from './features/editor/Preview.tsx'

function App() {
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
