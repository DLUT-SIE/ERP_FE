import React from 'react'
import { Table } from 'antd'
import './CustomTable.less'

const CustomTable = (props) => {
  console.log('...props', { ...props })
  return (
    <Table
      className='custom-table'
      rowKey={(record, index) => {
        let id = (
          record.order_id ||
          record.id ||
          index
        )
        return '' + id
      }}
      {...props}
    />
  )
}

export default CustomTable
