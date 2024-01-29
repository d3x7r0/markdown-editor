import type { ChangeEventHandler, FunctionComponent } from 'react'
import { useCallback } from 'react'
import clsx from 'clsx'

import { useAppDispatch, useAppSelector } from '../../app/hooks.ts'

import { RootState } from '../../app/store.ts'

import { updateText } from './editorSlice.ts'
import styles from './Editor.module.css'

export type EditorProps = {
  className?: string | undefined;
}

const Editor: FunctionComponent<EditorProps> = (props) => {
  const ready = useAppSelector((state: RootState) => state.editor.status === 'ready')
  const value = useAppSelector((state: RootState) => state.editor.value)
  const dispatch = useAppDispatch()

  const onChange = useCallback<ChangeEventHandler<HTMLTextAreaElement>>(
    e => dispatch(updateText(e.currentTarget.value)),
    [dispatch],
  )

  return (
    <textarea
      disabled={!ready}
      value={value}
      onChange={onChange}
      className={clsx(styles.editor, props.className)}
    />
  )
}

export default Editor
