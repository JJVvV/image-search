import React from 'react'
import styles from './placeholder.component.sass'

type Props = {
  title: string
}
export const Placeholder: React.FC<Props> = React.memo((props) => {
  return (
    <div className={styles['placeholder']}>
      <div className={styles['img']}></div>
      <div className={styles['title']}>{props.title}</div>
    </div>
  )
})
