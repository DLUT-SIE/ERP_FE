import React from 'react'
import PropTypes from 'prop-types'
import QueryString from 'query-string'
import _ from 'lodash'
import util from 'utils'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import moment from 'moment'

import FilterBar from './FilterBar'
import CustomTable from 'components/CustomTable'

const columns = [
  'sub_order_uid', 'common_uid', 'create_dt', 'refunder', 'department', 'action'
]
const entryStatus = {
  REFUND_CHOICES_KEEPER: 2,
  REFUND_CHOICES_END: 3
}

class SteelRefund extends React.Component {
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
      create_dt:{
        render: (text, record, index) => {
          return moment(record.create_dt).format('YYYY-MM-DD')
        }
      },
      action: {
        render: (text, record, index) => {
          if (record.status === entryStatus.REFUND_CHOICES_KEEPER) {
            return (
              <Button
                type='danger'
                size='small'
                data-id={record.uid}
              >
                <Link to={`/inventory/brought_in/brought_in_entry/${record.uid}`}>待处理</Link>
              </Button>
            )
          } else {
            return (
              <Button
                type='primary'
                size='small'
                data-id={record.uid}
              >
                <Link to={`/inventory/brought_in/brought_in_entry/${record.uid}`}>详情</Link>
              </Button>
            )
          }
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
      if (item === '' || _.isUndefined(item) || _.isNull(item) || key === 'status') {
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

SteelRefund.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  status: PropTypes.object.isRequired,
  getListDataAction: PropTypes.func.isRequired
}

export default SteelRefund
