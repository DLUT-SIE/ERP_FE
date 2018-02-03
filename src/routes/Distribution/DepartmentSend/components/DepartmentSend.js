import React from 'react'
import PropTypes from 'prop-types'
import QueryString from 'query-string'
import _ from 'lodash'
import util from 'utils'
import { Upload, Button, message } from 'antd'
import fetchAPI from 'api'
import { apis } from 'api/config'

import CustomTable from 'components/CustomTable'
import './DepartmentSend.less'

const columns = [
  'production_name', 'send_file', 'upload_file', 'pretty_status', 'action'
]

class Production extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}

    this._deptType = this.props.location.pathname.split('/')[2].split('_')[0]
    this._deptMap = window.erpConfig.deptMap ? JSON.parse(window.erpConfig.deptMap) : {}
    this._columns = this.buildColumns()
  }

  componentDidMount () {
    this.props.getListDataAction({
      params: this._query()
    })
  }

  buildColumns () {
    const deptMap = this._deptMap
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
      },
      action: {
        render : (text, record, index) => {
          const document = record.documents_to_distribution[this._deptType]
          const data = { product: record.id, dst: deptMap['distribution'], src: deptMap[this._deptType] }
          return document && document.pretty_status === '通过' ? '已上传' : (
            <Upload
              name='file'
              data={data}
              customRequest={this.uploadFile}
            >
              <Button
                type='primary'
                size='small'
              >
                上传招标文件
              </Button>
            </Upload>
          )
        }
      }
    })
  }

  uploadFile = (file) => {
    fetchAPI(apis.DistributionAPI.uploadBidFile, {
      path: file.file,
      ...file.data
    }, {}, true).then(() => {
      message.success('上传成功')
      this.updatelist()
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

  handleChangeTable = (pagination, filters, sorter) => {
    this.props.getListDataAction({
      params: {
        related: this._deptMap[this._deptType],
        page: pagination.current > 1 ? pagination.current : ''
      }
    })
  }

  _query (query = {}) {
    const oldQuery = QueryString.parse(this.props.location.search)
    return Object.assign({
      page: 1,
      related: this._deptMap[this._deptType]
    }, oldQuery, query)
  }

  updateQuery (newQuery = {}) {
    let { pathname } = this.props.location
    let mergeQuery = this._query(newQuery)
    let filterQuery = _.forEach(mergeQuery, (item, key) => {
      if (item === '' || _.isUndefined(item)) {
        delete mergeQuery[key]
      }
    })
    const search = QueryString.stringify(filterQuery)
    this.props.history.push({
      pathname: pathname,
      search
    })
    this.updatelist(filterQuery)
    return filterQuery
  }

  updatelist (query = QueryString.parse(this.props.location.search)) {
    this.props.getListDataAction({
      params: {
        related: this._deptMap[this._deptType],
        ...query
      }
    })
  }

  handleChangeTable = (pagination, filters, sorter) => {
    this.updateQuery({
      page: pagination.current > 1 ? pagination.current : ''
    })
  }

  render () {
    const { status } = this.props
    const mydata = status.toJS()
    const list = _.get(mydata, 'list', [])
    const loading = _.get(mydata, 'loading')
    const pagination = _.get(mydata, 'pagination', {})
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
  history: PropTypes.object.isRequired,
  status: PropTypes.object.isRequired,
  getListDataAction: PropTypes.func.isRequired
}

export default Production
