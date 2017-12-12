import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import util from 'utils'
import { message } from 'antd'
import fetchAPI from 'api'
import { apis } from 'api/config'

import CustomTable from 'components/CustomTable'

const columns = [
  'production_name', 'send_file', 'upload_file', 'status'
]

class Production extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    this._columns = this.buildColumns()
  }

  componentDidMount () {
    this.props.getListDataAction({
      params: {
        related: 4
      },
      callback: (data) => {
        const columns = this.buildColumns()
        this.props.addListDataAction({ data: data, columns: columns })
      }
    })
  }

  buildColumns () {
    return util.buildColumns(columns, {
      send_file: {
        // render: (text, record, index) => {
        //   // return
        // }
      }
    })
  }

  getDepartmentFile = (deptName, documents) => {
    const { deptMap } = this.state
    const deptId = deptMap[deptName]
    const document = _.find(documents, (document) => {
      return document.dst === deptId
    })
    return document
  }

  uploadFile = (file) => {
    fetchAPI(apis.Distribution.uploadBidFile, {
      path: file.file,
      ...file.data
    }).then((repos) => {
      message.success('上传成功')
    })
  }

  handleChangeTable = (pagination, filters, sorter) => {
    this.props.getListDataAction({
      params: {
        related: 4,
        page: pagination.current > 1 ? pagination.current : ''
      }
    })
  }

  render () {
    const { status } = this.props
    const mydata = status.toJS()
    const list = _.get(mydata, 'list', [])
    const loading = _.get(mydata, 'loading')
    const pagination = _.get(mydata, 'pagination', {})
    const columns = _.get(mydata, 'columns', [])
    return (
      <div>
        <CustomTable
          dataSource={list}
          columns={columns}
          loading={loading}
          pagination={pagination}
          size='middle'
          bordered
          onChange={this.handleChangeTable}
        />
      </div>
    )
  }
}

Production.propTypes = {
  status: PropTypes.object.isRequired,
  getListDataAction: PropTypes.func.isRequired,
  addListDataAction: PropTypes.func.isRequired
}

export default Production
