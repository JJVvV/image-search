import { useEventCallback } from '@/hooks'
import React, { useMemo } from 'react'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import styles from './layout-header.component.sass'
import cx from 'classnames'
type Breadcrumb = {
  name: string
  id: number
  level: number
}

type HeaderProps = {
  data: Breadcrumb[]
  showSearch?: boolean
  showStatus?: boolean
  gmtModified?: string
}

export const CommunityHeader: React.FC<HeaderProps> = React.memo((props) => {
  const navigate = useNavigate()
  const onClickSearch = useEventCallback(() => {
    navigate('/search')
  })
  const breadcrumb = props.data.map((item, index) => {
    const onClick = () => {
      if (item.level === 1) {
        navigate('/')
      } else {
        navigate(`/${item.level}/${item.id}`)
      }
    }
    if (index === props.data.length - 1) {
      return (
        <div
          key={`${index}_${item.id}`}
          className={cx(
            styles['name'],
            props.data.length === 1 ? null : styles['active']
          )}
        >
          {item.name}
        </div>
      )
    }
    return (
      <React.Fragment key={`${index}_${item.id}`}>
        <div className={styles['name']} onClick={onClick}>
          {item.name}
        </div>
        <div className={styles['breadcrumb-icon']}></div>
      </React.Fragment>
    )
  })
  const renderSearch = () => {
    if (props.showSearch) {
      return (
        <div className={styles['search']} onClick={onClickSearch}>
          <div className={styles['search-icon']}></div>
        </div>
      )
    }
  }
  const updateTime = useMemo(() => {
    if (props.gmtModified) {
      // HH:mm:ss
      return dayjs(props.gmtModified).format('YYYY/MM/DD')
    }
    return ''
  }, [props.gmtModified])
  const renderStatus = () => {
    if (props.showStatus) {
      return (
        <div className={styles['status-wrapper']}>
          <span className={styles['status']}>待采集</span>
        </div>
      )
    }
    if (!props.showStatus && props.gmtModified) {
      return (
        <div className={styles['status-wrapper']}>
          <span className={`${styles.status} ${styles.update}`}>
            更新时间：{updateTime}
          </span>
        </div>
      )
    }
  }
  return (
    <>
      <div className={styles['header']}>
        <div className={styles['breadcrumb']}>{breadcrumb}</div>
        {renderSearch()}
      </div>
      {renderStatus()}
    </>
  )
})
