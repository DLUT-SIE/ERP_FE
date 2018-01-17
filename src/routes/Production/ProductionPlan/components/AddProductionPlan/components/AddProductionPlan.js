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

const columns = [
  'work_order', 'client', 'delivery_dt', 'product', 'production_count', 'output_value', 'output',
  'remarks', 'status_description'
]

class AddProductionPlan extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    this._columns = this.buildColumns()
    this.rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({ addLists: selectedRowKeys })
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User' // Column configuration not to be checked
      })
    }
  }

  buildColumns () {
    return util.buildColumns(columns, {
      spec: {
        render: (text, record, index) => {
          return record.spec || record.size
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
  createProductionPlan = (lists) => {
    let values = {
      work_order_ids: lists
    }
    fetchAPI(apis.ProductionAPI.createProductionPlan, values).then((repos) => {
      message.success('添加成功！')
      this.props.getListDataAction({
        params: this._query()
      })
    })
  }
  handleAddRecords = (fieldsValue) => {
    let lists = this.state.addLists.map((item) => {
      return parseInt(item)
    })
    this.createProductionPlan(lists)
    console.log('addLists', this.state.addLists)
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
          rowSelection={this.rowSelection}
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
AddProductionPlan.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  status: PropTypes.object.isRequired,
  getListDataAction: PropTypes.func.isRequired
}

export default AddProductionPlan
