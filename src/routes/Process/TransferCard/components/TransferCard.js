import React from 'react'
import PropTypes from 'prop-types'
import QueryString from 'query-string'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import util from 'utils'
import { Button, Popconfirm, message } from 'antd'
import fetchAPI from 'api'
import { apis } from 'api/config'

import CustomTable from 'components/CustomTable'
import TableInfo from './TableInfo'

const columns = [
  'ticket_number', 'part_name', 'transfer_card_category', 'file_index', 'write_status', 'action'
]

class TransferCard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    this._columns = this.buildColumns()
    this._workOrderInfo = QueryString.parse(this.props.location.search)
  }

  componentDidMount () {
    const query = this._query()
    if (query.work_order_uid !== undefined) {
      this.props.getListDataAction({
        params: this._query()
      })
    }
  }

  buildColumns () {
    return util.buildColumns(columns, {
      action: {
        render: (text, record, index) => {
          return (
            <span>
              <Button
                type='primary'
                size='small'
                data-index={index}
              >
                <Link to={`/process/process/transfer_card/transfer_card_detail/?id=${record.id}&category=${record.category}`}>
                  查看
                </Link>
              </Button>
              <span className='ant-divider' />
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
            </span>
          )
        }
      }
    })
  }

  handleDelete = (id) => {
    return (e) => {
      fetchAPI(apis.ProcessAPI.deleteTransferCard, {}, { id }).then((repos) => {
        message.success('删除成功！')
        this.updatelist()
      })
    }
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
    console.log('updatelist', query)
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
    const { status } = this.props
    const mydata = status.toJS()
    const list = _.get(mydata, 'list', [])
    const loading = _.get(mydata, 'loading')
    const pagination = _.get(mydata, 'pagination', {})
    const workOrderInfo = this._workOrderInfo
    return (
      <div>
        <TableInfo
          fieldsValue={workOrderInfo}
        />
        <CustomTable
          style={{ marginTop: 0 }}
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

TransferCard.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  status: PropTypes.object.isRequired,
  getListDataAction: PropTypes.func.isRequired
}

export default TransferCard
