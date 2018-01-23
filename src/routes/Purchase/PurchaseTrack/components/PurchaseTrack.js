import React from 'react'
import PropTypes from 'prop-types'
import QueryString from 'query-string'
import _ from 'lodash'
import util from 'utils'
// import fetchAPI from 'api'
// import { apis } from 'api/config'
import { BID_STATUS_MAP } from 'const'
import { Button } from 'antd'

import FilterBar from './FilterBar'
import CustomTable from 'components/CustomTable'
// import './PurchaseTrack.less'

const columns = [
  'bidding_sheet_uid', 'supplier_select', 'call_for_bid', 'process_track', 'checkout_entry', 'bid_status',
  'status_change_history', 'status_backtrack'
]

class PurchaseTrack extends React.Component {
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
      supplier_select: {
        render: (text, record, index) => {
          let btnType
          const status = BID_STATUS_MAP['供应商选择']
          if (record.status > status) {
            btnType = 'default'
          } else if (record.status === status) {
            btnType = 'primary'
          } else {
            btnType = 'success'
          }
          return (
            <Button
              type={btnType}
              size='small'
              disabled={record.status !== status}
              data-id={record.id}
              onClick={this.handleSupplierSelect}
            >
              供应商选择
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
      params: this._query(query)
    })
  }

  handleChangeTable = (pagination, filters, sorter) => {
    this.updateQuery({
      page: pagination.current > 1 ? pagination.current : ''
    })
  }

  handleSupplierSelect = (e) => {
    const { id } = e.target.dataset
    this.props.history.push({
      pathname: '/purchase/purchase_track/supplier_select/',
      search: `?id=${id}`
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
      <div className='pending-order'>
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

PurchaseTrack.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  status: PropTypes.object.isRequired,
  getListDataAction: PropTypes.func.isRequired
}

export default PurchaseTrack
