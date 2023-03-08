import { useSearchStore, useEventCallback } from '@/hooks'
import { Button, Form } from 'antd'
import React from 'react'
import styles from './search.component.sass'

export function Search() {
  const [form] = Form.useForm()
  const searchStore = useSearchStore()
  const onSearch = useEventCallback(() => {
    form.validateFields().then((values) => {
      // todo(alex) search
    })
  })

  const renderWaterfall = () => {
    if (searchStore.loading.search) {
      // todo(alex)
      return 'loadinng'
    }
    return <div>render waterfall</div>
  }
  return (
    <div className={styles['wrapper']}>
      <Form form={form} layout="horizontal" className={styles['form']}>
        <Button
          className={styles.search}
          block
          onClick={onSearch}
          color="primary"
          size="large"
        >
          search
        </Button>
      </Form>
      {renderWaterfall()}
    </div>
  )
}
