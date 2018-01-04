import React from 'react'
import PropTypes from 'prop-types'
import QueryString from 'query-string'
import _ from 'lodash'
import util from 'utils'
// import fetchAPI from 'api'
// import { apis } from 'api/config'
import { Button } from 'antd'

import PurchaseOrderInfo from './PurchaseOrderInfo'
import CustomTable from 'components/CustomTable'

const columns = [
  'uid', 'ticket_number', 'name_and_spec', 'drawing_number', 'material', 'count',
  'piece_weight', 'total_weight', 'remark', 'order_status', 'action'
]

class PurchaseOrder extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    this._columns = this.buildColumns()
    this._id = QueryString.parse(props.location.search).id
  }

  componentDidMount () {
    this.props.getListDataAction({
      params: this._query()
    })
  }

  buildColumns () {
    return util.buildColumns(columns, {
      name_and_spec: {
        render: (text, record, index) => {
          return `${record.name}/${record.spec}`
        }
      },
      action: {
        render: (text, record, index) => {
          return (
            <Button
              type='primary'
              size='small'
              data-id={record.id}
            >
              修改
            </Button>
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
    const mydata = this.props.status.toJS()
    const list = _.get(mydata, 'list', [])
    const loading = _.get(mydata, 'loading')
    const pagination = _.get(mydata, 'pagination', {})
    const purchaseOrderInfo = _.get(mydata, 'purchaseOrderInfo', {})
    return (
      <div>
        <PurchaseOrderInfo
          fieldsValue={purchaseOrderInfo}
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

PurchaseOrder.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  status: PropTypes.object.isRequired,
  getListDataAction: PropTypes.func.isRequired
}

export default PurchaseOrder
