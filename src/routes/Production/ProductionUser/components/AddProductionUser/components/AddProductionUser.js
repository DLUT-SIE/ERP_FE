import React from 'react'
import PropTypes from 'prop-types'
import QueryString from 'query-string'
import _ from 'lodash'
import util from 'utils'
import fetchAPI from 'api'
import { apis } from 'api/config'
import { Button, message } from 'antd'

import FilterBar from './FilterBar'
import CustomTable from 'components/CustomTable'

const columns = [
  'first_name', 'phone', 'mobile', 'gender', 'action'
]

class ProductionPlan extends React.Component {
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
      phone: {
        render: (text, record, index) => {
          return record.info.phone
        }
      },
      mobile: {
        render: (text, record, index) => {
          return record.info.mobile
        }
      },
      gender: {
        render: (text, record, index) => {
          return record.info.gender
        }
      },
      action: {
        render: (text, record, index) => {
          return (
            <Button
              type='primary'
              size='small'
              data-id={record.info.id}
              data-index={index}
              onClick={this.handleAddUser}
            >
            添加
            </Button>
          )
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
  handleAddUser = (e) => {
    let { url, method } = apis.ProductionAPI.createProductionUsers
    const { id } = e.target.dataset
    const api = {
      url,
      method
    }
    let values = {
      user_info: id
    }
    fetchAPI(api, values).then((repos) => {
      message.success('修改成功！')
      this.props.getListDataAction({
        params: this._query()
      })
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

ProductionPlan.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  status: PropTypes.object.isRequired,
  getListDataAction: PropTypes.func.isRequired
}

export default ProductionPlan
