import React from 'react'
import PropTypes from 'prop-types'
import QueryString from 'query-string'
import _ from 'lodash'
import util from 'utils'
import { Button, Upload, message, Divider } from 'antd'
import { Link } from 'react-router-dom'
import fetchAPI from 'api'
import { apis } from 'api/config'

import FilterBar from 'components/WorkOrderFilterBar'
import CustomTable from 'components/CustomTable'
import './ProcessImport.less'

const columns = [
  'work_order_uid', 'production_name', 'action'
]

class ProcessImport extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    this._columns = this.buildColumns()
  }

  componentDidMount () {
    this.props.getListDataAction({
      params: this._query()
    })
  }

  buildColumns () {
    return util.buildColumns(columns, {
      action: {
        render: (text, record, index) => {
          return (
            <div>
              <Button
                type='primary'
                size='small'
                data-id={record.id}
                disabled={record.status === 0}
              >
                <Link to={`/process/process/?work_order_uid=${record.work_order_uid}`}>
                  查 看
                </Link>
              </Button>
              <Divider type='vertical' />
              <Upload
                name='file'
                accept='.xlsx, .xls, .xlsm'
                data={{ id: record.id }}
                customRequest={this.uploadFile}
              >
                <Button
                  type='primary'
                  size='small'
                  disabled={record.status === 2}
                >
                  导入
                </Button>
              </Upload>
              <Divider type='vertical' />
              <Button
                type='primary'
                size='small'
                data-id={record.id}
                disabled={record.status !== 1}
                onClick={this.handleProof}
              >
                审核
              </Button>
            </div>
          )
        }
      }
    })
  }

  uploadFile = (file) => {
    fetchAPI(apis.ProcessAPI.uploadProcessLibrary, {
      file: file.file,
      ...file.data
    }).then(() => {
      message.success('上传成功')
      this.updatelist()
    })
  }

  handleProof = (e) => {
    const { id } = e.target.dataset
    console.log('handleProof', id)
  }

  handleSearch = (searchValue) => {
    this.updateQuery({
      page: 1,
      ...searchValue
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
    this.props.getListDataAction({
      params: query
    })
  }

  handleChangeTable = (pagination, filters, sorter) => {
    this.updateQuery({
      page: pagination.current > 1 ? pagination.current : ''
    })
  }

  render () {
    const { status, location } = this.props
    const query = QueryString.parse(location.search)
    const mydata = status.toJS()
    const list = _.get(mydata, 'list', [])
    const loading = _.get(mydata, 'loading')
    const pagination = _.get(mydata, 'pagination', {})
    return (
      <div className='process-import'>
        <FilterBar
          fieldsValue={query}
          onSearch={this.handleSearch}
        />
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

ProcessImport.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  status: PropTypes.object.isRequired,
  getListDataAction: PropTypes.func.isRequired
}

export default ProcessImport
