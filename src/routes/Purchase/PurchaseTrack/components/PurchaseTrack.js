import React from 'react'
import PropTypes from 'prop-types'
import QueryString from 'query-string'
import _ from 'lodash'
import util from 'utils'
import fetchAPI from 'api'
import { apis } from 'api/config'
import { Link } from 'react-router-dom'
import { BID_STATUS_MAP } from 'const'
import { Button, message } from 'antd'

import FilterBar from './FilterBar'
import CustomTable from 'components/CustomTable'
import StatusModal from 'components/StatusModal'
import './PurchaseTrack.less'

const columns = [
  'bidding_sheet_uid', 'supplier_select', 'call_for_bid', 'process_track', 'checkout_entry', 'bid_pretty_status',
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

  getBtnType = (status, currentStatus) => {
    let btnType
    if (currentStatus > status) {
      btnType = 'success'
    } else if (currentStatus === status) {
      btnType = 'primary'
    } else {
      btnType = 'default'
    }
    return btnType
  }

  buildColumns () {
    return util.buildColumns(columns, {
      supplier_select: {
        render: (text, record, index) => {
          const status = BID_STATUS_MAP['供应商选择']
          const btnType = this.getBtnType(status, record.status)
          return (
            <Button
              type={btnType}
              size='small'
              disabled={record.status !== status}
            >
              { record.status === status ? (
                <Link to={`/purchase/purchase_track/supplier_select/?id=${record.id}`}>
                  供应商选择
                </Link>
              ) : '供应商选择'}
            </Button>
          )
        }
      },
      call_for_bid: {
        render: (text, record, index) => {
          let btnType
          const statusStart = BID_STATUS_MAP['招标申请选择']
          const statusEnd = BID_STATUS_MAP['中标确认']
          if (record.status > statusEnd) {
            btnType = 'success'
          } else if (record.status < statusStart) {
            btnType = 'default'
          } else {
            btnType = 'primary'
          }
          return (
            <Button
              type={btnType}
              size='small'
              disabled={btnType !== 'primary'}
            >
              { btnType === 'primary' ? (
                <Link to={`/purchase/purchase_track/call_for_bid/?id=${record.id}`}>
                  招标
                </Link>
              ) : '招标'}
            </Button>
          )
        }
      },
      process_track: {
        render: (text, record, index) => {
          const status = BID_STATUS_MAP['进程跟踪']
          const btnType = this.getBtnType(status, record.status)
          return (
            <Button
              type={btnType}
              size='small'
              disabled={record.status !== status}
            >
              { record.status === status ? (
                <Link to={`/purchase/purchase_track/process_track/?id=${record.id}`}>
                  进程跟踪
                </Link>
              ) : '进程跟踪'}
            </Button>
          )
        }
      },
      checkout_entry: {
        render: (text, record, index) => {
          let btnType
          const statusStart = BID_STATUS_MAP['标单检验']
          const statusEnd = BID_STATUS_MAP['标单入库']
          if (record.status > statusEnd) {
            btnType = 'success'
          } else if (record.status < statusStart) {
            btnType = 'default'
          } else {
            btnType = 'primary'
          }
          return (
            <Button
              type={btnType}
              size='small'
              disabled={btnType !== 'primary'}
            >
              { btnType === 'primary' ? (
                <Link to={`/purchase/purchase_track/checkout_entry/?id=${record.id}&status=${record.status}`}>
                  检验入库
                </Link>
              ) : '检验入库'}
            </Button>
          )
        }
      },
      status_change_history: {
        render: (text, record, index) => {
          return (
            <Button
              type='primary'
              size='small'
            >
              <Link to={`/purchase/status_back_track/status_history/?uid=${record.uid}&id=${record.id}`}>
                查看
              </Link>
            </Button>
          )
        }
      },
      status_backtrack: {
        render: (text, record, index) => {
          return (
            <Button
              type='primary'
              size='small'
              data-fields-value={JSON.stringify(record)}
              onClick={this.handleOpenStatusModal}
            >
              更改状态
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
      params: query
    })
  }

  handleChangeTable = (pagination, filters, sorter) => {
    this.updateQuery({
      page: pagination.current > 1 ? pagination.current : ''
    })
  }

  handleOpenStatusModal = (e) => {
    let { fieldsValue } = e.target.dataset
    fieldsValue = JSON.parse(fieldsValue)
    this.props.changeStatusModalAction({
      visible: true,
      fieldsValue: {
        bidding_sheet_id: fieldsValue.id,
        bidding_sheet: fieldsValue.uid,
        original_status: fieldsValue.status,
        pretty_original_status: fieldsValue.pretty_status
      }
    })
  }

  handleCloseStatusModal = () => {
    this.props.changeStatusModalAction({
      visible: false
    })
  }

  handleSaveStatusChange = (fieldsValue) => {
    fetchAPI(apis.PurchaseAPI.addStatusChanges, fieldsValue).then((repos) => {
      message.success('更改成功！')
      this.handleCloseStatusModal()
      this.updatelist()
    })
  }

  render () {
    const { status, location } = this.props
    const query = QueryString.parse(location.search)
    const mydata = status.toJS()
    const list = _.get(mydata, 'list', [])
    const loading = _.get(mydata, 'loading')
    const pagination = _.get(mydata, 'pagination', {})
    const statusModal = _.get(mydata, 'statusModal', {})
    return (
      <div className='purchase-track'>
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
        { statusModal.visible &&
          <StatusModal
            {...statusModal}
            onOk={this.handleSaveStatusChange}
            onCancel={this.handleCloseStatusModal}
          />
        }
      </div>
    )
  }
}

PurchaseTrack.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  status: PropTypes.object.isRequired,
  getListDataAction: PropTypes.func.isRequired,
  changeStatusModalAction: PropTypes.func.isRequired
}

export default PurchaseTrack
