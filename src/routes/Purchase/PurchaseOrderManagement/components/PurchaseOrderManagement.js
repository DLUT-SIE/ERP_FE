import React from 'react'
import PropTypes from 'prop-types'
import QueryString from 'query-string'
import _ from 'lodash'
import util from 'utils'
import fetchAPI from 'api'
import { apis } from 'api/config'
import { Link } from 'react-router-dom'
import { Button, Popconfirm, message, Divider } from 'antd'

import FilterBar from './FilterBar.js'
import CustomTable from 'components/CustomTable'

const columns = [
  'purchase_order_uid', 'purchase_order_create_dt', 'action'
]

class PurchaseOrderManagement extends React.Component {
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
              >
                <Link to={`/purchase/purchase_order_management/purchase_order/?purchase_order=${record.id}`}>
                  查看
                </Link>
              </Button>
              <Divider type='vertical' />
              { record.status === 0 &&
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
              }
              { record.status === 1 &&
                <Button
                  size='small'
                >
                  完成
                </Button>
              }
            </div>
          )
        }
      }
    })
  }

  handleDelete = (id) => {
    return (e) => {
      const { url, method } = apis.PurchaseAPI.deletePurchaseOrder
      const api = {
        url: url(id),
        method
      }
      fetchAPI(api).then((repos) => {
        message.success('删除成功！')
        this.updatelist()
      })
    }
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
      page: 1,
      status: 0
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

  updatelist (query = this.props.location.query) {
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
      <div>
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

PurchaseOrderManagement.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  status: PropTypes.object.isRequired,
  getListDataAction: PropTypes.func.isRequired
}

export default PurchaseOrderManagement
