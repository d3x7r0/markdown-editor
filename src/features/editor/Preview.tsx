import type { FunctionComponent } from 'react'
import Markdown from 'react-markdown'
import clsx from 'clsx'

import type { RootState } from '../../app/store.ts'
import { useAppSelector } from '../../app/hooks.ts'

import styles from './Preview.module.css'

export type PreviewProps = {
  className?: string | undefined;
}

const Preview: FunctionComponent<PreviewProps> = (props) => {
  const value = useAppSelector((state: RootState) => state.editor.value)

  return (
    <div className={clsx(styles.preview, props.className)}>
      <Markdown>
        {value}
      </Markdown>
    </div>
  )
}

export default Preview
