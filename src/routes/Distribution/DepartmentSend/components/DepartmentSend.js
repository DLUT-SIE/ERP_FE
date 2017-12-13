import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import util from 'utils'
import { message } from 'antd'
import fetchAPI from 'api'
import { apis } from 'api/config'

import CustomTable from 'components/CustomTable'
import './DepartmentSend.less'

const columns = [
  'production_name', 'send_file', 'upload_file', 'pretty_status'
]

class Production extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    this._columns = this.buildColumns()

    this._deptType = this.props.location.pathname.split('/')[2].split('_')[0]
    this._deptMap = window.erpConfig.deptMap
  }

  componentDidMount () {
    this.props.getListDataAction({
      params: {
        related: this._deptMap[this._deptType]
      }
    })
  }

  buildColumns () {
    return util.buildColumns(columns, {
      send_file: {
        render: (text, record, index) => {
          const document = record.documents_from_distribution[this._deptType]
          return document ? (
            <a
              className='document-link'
              href={document.path}
              download={document.name}
            >
              {document.name}
            </a>
          ) : ''
        }
      },
      upload_file: {
        render: (text, record, index) => {
          const document = record.documents_to_distribution[this._deptType]
          return document ? (
            <a
              className='document-link'
              href={document.path}
              download={document.name}
            >
              {document.name}
            </a>
          ) : ''
        }
      },
      pretty_status: {
        render: (text, record, index) => {
          const document = record.documents_to_distribution[this._deptType]
          return document ? document.pretty_status : ''
        }
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
    // const columns = _.get(mydata, 'columns', [])
    return (
      <div className='department-send'>
        <CustomTable
          dataSource={list}
          columns={this._columns}
          loading={loading}
          pagination={pagination}
          size='middle'
          onChange={this.handleChangeTable}
        />
      </div>
    )
  }
}

Production.propTypes = {
  location: PropTypes.object.isRequired,
  status: PropTypes.object.isRequired,
  getListDataAction: PropTypes.func.isRequired
}

export default Production
