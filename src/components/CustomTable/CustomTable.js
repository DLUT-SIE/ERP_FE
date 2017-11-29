import React from 'react'
import { Table } from 'antd'
import './CustomTable.less'

const CustomTable = (props) => {
  return (
    <Table
      className='custom-table'
      rowKey={(record, index) => {
        let id = (
          record.employee_id ||
          record.department_id ||
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
