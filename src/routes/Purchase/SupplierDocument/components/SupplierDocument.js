import React from 'react'
import PropTypes from 'prop-types'
import QueryString from 'query-string'
import _ from 'lodash'
import util from 'utils'
import fetchAPI from 'api'
import { apis } from 'api/config'
import { Button, Popconfirm, message, Upload } from 'antd'

import CustomTable from 'components/CustomTable'
import './SupplierDocument.less'

const columns = [
  'doc_name', 'doc_size', 'upload_dt', 'action'
]

class SupplierDocument extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    const query = QueryString.parse(this.props.location.search)
    this._id = +query.id
    this._uid = query.uid
    this._columns = this.buildColumns()
  }

  componentDidMount () {
    this.fetchData(this._query())
  }

  fetchData (query) {
    this.props.getListDataAction({
      params: {
        supplier: this._id,
        ...query
      }
    })
  }

  buildColumns () {
    return util.buildColumns(columns, {
      doc_name: {
        render: (text, record, index) => {
          return record.doc_name && (
            <a
              className='document-link'
              key={index}
              href={record.path}
              download={record.doc_name}
            >
              {record.doc_name}
            </a>
          )
        }
      },
      upload_dt: {
        render: (text, record, index) => {
          return record.upload_dt && record.upload_dt.split('T')[0]
        }
      },
      action: {
        render: (text, record, index) => {
          return (
            <Popconfirm
              title='确定删除吗？'
              onConfirm={this.handleDelete(record.id)}
              okText='确定'
              cancelText='取消'
            >
              <Button
                type='danger'
                size='small'
              >
                删除
              </Button>
            </Popconfirm>
          )
        }
      }
    })
  }

  _query (query = {}) {
    const oldQuery = QueryString.parse(this.props.location.search)
    return Object.assign({
      page: 1
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
    this.fetchData(query)
  }

  handleChangeTable = (pagination, filters, sorter) => {
    this.updateQuery({
      page: pagination.current > 1 ? pagination.current : ''
    })
  }

  handleDelete = (id) => {
    return (e) => {
      fetchAPI(apis.PurchaseAPI.deleteSupplierDocument, {}, { id }).then((repos) => {
        message.success('删除成功！')
        this.fetchData(this._query())
      })
    }
  }

  uploadFile = (file) => {
    fetchAPI(apis.PurchaseAPI.addSupplierDocument, {
      path: file.file,
      ...file.data
    }, {}, true).then(() => {
      message.success('上传成功')
      this.updatelist()
    })
  }

  render () {
    const { status } = this.props
    const mydata = status.toJS()
    const list = _.get(mydata, 'list', [])
    const loading = _.get(mydata, 'loading')
    const pagination = _.get(mydata, 'pagination', {})
    const data = { supplier: this._id }
    return (
      <div className='supplier-document'>
        <h1 className='title'>供应商编号：{this._uid}</h1>
        <Upload
          className='add-btn'
          name='file'
          data={data}
          customRequest={this.uploadFile}
        >
          <Button
            type='success'
          >
            上传供应商文件
          </Button>
        </Upload>
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

SupplierDocument.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  status: PropTypes.object.isRequired,
  getListDataAction: PropTypes.func.isRequired
}

export default SupplierDocument
