import React from 'react'
import PropTypes from 'prop-types'
import QueryString from 'query-string'
import _ from 'lodash'
import util from 'utils'
import { Button, Upload, message } from 'antd'
import fetchAPI from 'api'
import { apis } from 'api/config'

import CustomTable from 'components/CustomTable'
import './Production.less'

const columns = [
  'production_name', 'send_file'
]

class Production extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    this._deptMap = window.erpConfig.deptMap
    this._columns = this.buildColumns()
  }

  componentDidMount () {
    this.props.getListDataAction({
      params: this._query()
    })
  }

  uploadFile = (file) => {
    fetchAPI(apis.Distribution.uploadBidFile, {
      path: file.file,
      ...file.data
    }).then(() => {
      message.success('上传成功')
      this.updatelist()
    })
  }

  buildColumns () {
    const deptMap = this._deptMap
    return util.buildColumns(columns, {
      name: {
        width: 260,
        fixed: 'left'
      },
      send_file: {
        children: [{
          title: '生产',
          key: 'production',
          colSpan: 2,
          width: 250,
          render: (text, record, index) => {
            const document = record.documents_from_distribution['production']
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
        }, {
          key: 'production_upload',
          colSpan: 0,
          width: 60,
          render : (text, record, index) => {
            const data = { product: record.id, dst: deptMap['production'], src: deptMap['distribution'] }
            return (
              <Upload
                name='file'
                data={data}
                customRequest={this.uploadFile}
              >
                <Button
                  type='primary'
                  size='small'
                >
                  上传
                </Button>
              </Upload>
            )
          }
        }, {
          title: '工艺',
          key: 'process',
          colSpan: 2,
          width: 250,
          render: (text, record, index) => {
            const document = record.documents_from_distribution['process']
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
        }, {
          key: 'process_upload',
          colSpan: 0,
          width: 60,
          render : (text, record, index) => {
            const data = { product: record.id, dst: deptMap['process'], src: deptMap['distribution'] }
            return (
              <Upload
                name='file'
                data={data}
                customRequest={this.uploadFile}
              >
                <Button
                  type='primary'
                  size='small'
                >
                  上传
                </Button>
              </Upload>
            )
          }
        }, {
          title: '采购',
          key: 'procurement',
          colSpan: 2,
          render: (text, record, index) => {
            const document = record.documents_from_distribution['procurement']
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
        }, {
          key: 'procurement_upload',
          colSpan: 0,
          width: 60,
          render : (text, record, index) => {
            const data = { product: record.id, dst: deptMap['procurement'], src: deptMap['distribution'] }
            return (
              <Upload
                name='file'
                data={data}
                customRequest={this.uploadFile}
              >
                <Button
                  type='primary'
                  size='small'
                >
                  上传
                </Button>
              </Upload>
            )
          }
        }]
      }
    })
  }

  _query (query = {}) {
    const oldQuery = QueryString.parse(this.props.location.search)
    return Object.assign({
      page: 1
    }, oldQuery, query)
  }

  updatelist (query = QueryString.parse(this.props.location.search)) {
    this.props.getListDataAction({
      params: query
    })
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
      <div className='production'>
        <CustomTable
          dataSource={list}
          columns={this._columns}
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
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  status: PropTypes.object.isRequired,
  getListDataAction: PropTypes.func.isRequired
}

export default Production
