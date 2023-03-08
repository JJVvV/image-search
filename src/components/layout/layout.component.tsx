import React from 'react'
import { CommunityHeader } from '@/components/layout-header'
import { useBreadcrumb, useInitCommunityParents } from '@/hooks'

import styles from './layout.component.sass'

type Props = {
  level: number
  showSearch?: boolean
  showStatus?: boolean
  children: React.ReactNode
  gmtModified?: string
}

export const Layout: React.FC<Props> = React.memo((props) => {
  const breadcrumb = useBreadcrumb(props.level)
  // const store = useStore()
  // const { id } = useParams()
  const isReady = useInitCommunityParents()
  // useEffect(() => {
  //   store.initCommunities(Number(id), props.level)
  // }, [id])
  if (!isReady) {
    return null
  }
  // useInitCommunityParents()
  return (
    <div className={styles['wrapper']}>
      <CommunityHeader
        showSearch={props.showSearch ?? true}
        showStatus={!!props.showStatus}
        gmtModified={props.gmtModified}
        data={breadcrumb}
      />
      {props.children}
    </div>
  )
})
