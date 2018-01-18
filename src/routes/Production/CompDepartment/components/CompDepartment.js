import React from 'react'
import PropTypes from 'prop-types'
import QueryString from 'query-string'
import _ from 'lodash'
import util from 'utils'
import fetchAPI from 'api'
import { apis } from 'api/config'
import { message } from 'antd'

import FilterBar from './FilterBar'
import CustomTable from 'components/CustomTable'
import HandleItem from './HandleItem'

const columns = [
  'sub_order', 'sketch', 'pressure_test', 'process_lib', 'product_graph', 'encasement_graph', 'shipping_mark', 'encasement_list', 'coating_detail'
]

class CompDepartment extends React.Component {
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
      sketch: {
        render: (text, record, index) => {
          return <HandleItem type='sketch' item={record} handleConfirm={this.handleConfirm} handleRevoke={this.handleRevoke} />
        }
      },
      pressure_test: {
        render: (text, record, index) => {
          return <HandleItem type='pressure_test' item={record} handleConfirm={this.handleConfirm} handleRevoke={this.handleRevoke} />
        }
      },
      process_lib: {
        render: (text, record, index) => {
          return <HandleItem type='process_lib' item={record} handleConfirm={this.handleConfirm} handleRevoke={this.handleRevoke} />
        }
      },
      product_graph: {
        render: (text, record, index) => {
          return <HandleItem type='product_graph' item={record} handleConfirm={this.handleConfirm} handleRevoke={this.handleRevoke} />
        }
      },
      encasement_graph: {
        render: (text, record, index) => {
          return <HandleItem type='encasement_graph' item={record} handleConfirm={this.handleConfirm} handleRevoke={this.handleRevoke} />
        }
      },
      shipping_mark: {
        render: (text, record, index) => {
          return <HandleItem type='shipping_mark' item={record} handleConfirm={this.handleConfirm} handleRevoke={this.handleRevoke} />
        }
      },
      encasement_list: {
        render: (text, record, index) => {
          return <HandleItem type='encasement_list' item={record} handleConfirm={this.handleConfirm} handleRevoke={this.handleRevoke} />
        }
      },
      coating_detail: {
        render: (text, record, index) => {
          return <HandleItem type='coating_detail' item={record} handleConfirm={this.handleConfirm} handleRevoke={this.handleRevoke} />
        }
      }
    })
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
      if (item === '' || _.isUndefined(item) || _.isNull(item)) {
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
  handleConfirm = (fieldsValue) => {
    const { id, type } = fieldsValue
    let values = {}
    values[type] = true
    fetchAPI(apis.ProductionAPI.updateCompDepartmentState, values, { id: id }).then((repos) => {
      message.success('修改成功！')
      this.props.getListDataAction({
        params: this._query()
      })
    })
  }
  handleRevoke = (fieldsValue) => {
    const { id, type } = fieldsValue
    let values = {}
    values[type] = false
    fetchAPI(apis.ProductionAPI.updateCompDepartmentState, values, { id: id }).then((repos) => {
      message.success('修改成功！')
      this.props.getListDataAction({
        params: this._query()
      })
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
          onAddClick={this.handleAddRecords}
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

CompDepartment.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  status: PropTypes.object.isRequired,
  getListDataAction: PropTypes.func.isRequired
}

export default CompDepartment
