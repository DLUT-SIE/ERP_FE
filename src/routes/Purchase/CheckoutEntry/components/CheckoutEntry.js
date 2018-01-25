import React from 'react'
import PropTypes from 'prop-types'
import QueryString from 'query-string'
import _ from 'lodash'
import util from 'utils'
import fetchAPI from 'api'
import { apis } from 'api/config'
import { Button, Checkbox, message } from 'antd'

import CustomTable from 'components/CustomTable'
import CustomSelect from 'components/CustomSelect'
import './CheckoutEntry.less'

const columns0 = [
  'selected', 'name_order', 'spec_order', 'material_order', 'count_order', 'total_weight_order', 'material_confirm',
  'soft_confirm', 'inspection_confirm'
]
const columns1 = [
  'selected', 'name_order', 'material_order', 'drawing_number_order', 'count_order', 'material_confirm', 'soft_confirm',
  'inspection_confirm'
]
const columns2 = [
  'selected', 'name_order', 'material_order', 'spec_order', 'material_confirm', 'soft_confirm', 'inspection_confirm'
]

class CheckoutEntry extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    const query = QueryString.parse(this.props.location.search)
    this._id = +query.id
    this._status = +query.status
    this._columns = this.buildColumns()
  }

  componentDidMount () {
    this.props.getBidDataAction({
      id: this._id,
      callback: (bid) => {
        this.props.getOrderDataAction({
          id: bid.purchase_order,
          callback: (order) => {
            let clm
            if (order.category === 0) {
              clm = columns0
            } else if (order.category === 1) {
              clm = columns1
            } else {
              clm = columns2
            }
            const columns = this.buildColumns(clm)
            this.props.addOrderDataAction({ data: order, columns })
          }
        })
      }
    })
    this.fetchListData()
  }

  fetchListData (query) {
    this.props.getListDataAction({
      params: {
        bidding_sheet: this._id,
        passed: false,
        ...query
      }
    })
  }

  buildColumns (columns) {
    return util.buildColumns(columns, {
      selected: {
        render: (text, record, index) => {
          if (record.material_confirm && record.soft_confirm && record.inspection_confirm) {
            return (
              <Checkbox />
            )
          } else {
            return ''
          }
        }
      },
      material_confirm: {
        render: (text, record, index) => {
          return (
            <Button
              type={record.material_confirm ? 'success' : 'primary'}
              disabled={record.material_confirm}
              data-id={record.id}
              onClick={this.handleMaterialConfirm}
            >
              实物
            </Button>
          )
        }
      },
      soft_confirm: {
        render: (text, record, index) => {
          return (
            <Button
              type={record.soft_confirm ? 'success' : 'primary'}
              disabled={record.soft_confirm}
              data-id={record.id}
              onClick={this.handleSoftConfirm}
            >
              软件
            </Button>
          )
        }
      },
      inspection_confirm: {
        render: (text, record, index) => {
          return (
            <Button
              type={record.inspection_confirm ? 'success' : 'primary'}
              disabled={record.inspection_confirm}
              data-id={record.id}
              onClick={this.handleInspectionConfirm}
            >
              检验
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

  updatelist (query = QueryString.parse(this.props.location.search)) {
    this.fetchListData(query)
  }

  handleChangeTable = (pagination, filters, sorter) => {
    this.updateQuery({
      page: pagination.current > 1 ? pagination.current : ''
    })
  }

  handleMaterialConfirm = (e) => {
    const { id } = e.target.dataset
    fetchAPI(apis.PurchaseAPI.updateArrivalInspections, { material_confirm: true }, { id: +id }).then(() => {
      message.success('修改成功！')
      this.updatelist()
    })
  }

  handleSoftConfirm = (e) => {
    const { id } = e.target.dataset
    fetchAPI(apis.PurchaseAPI.updateArrivalInspections, { soft_confirm: true }, { id: +id }).then(() => {
      message.success('修改成功！')
      this.updatelist()
    })
  }

  handleInspectionConfirm = (e) => {
    const { id } = e.target.dataset
    fetchAPI(apis.PurchaseAPI.updateArrivalInspections, { inspection_confirm: true }, { id: +id }).then(() => {
      message.success('修改成功！')
      this.updatelist()
    })
  }

  handleCreateEntry = () => {}

  handleFinishBid = () => {
    fetchAPI(apis.PurchaseAPI.updateBiddingSheet, { status: 9 }, { id: this._id }).then(() => {
      message.success('状态修改成功！')
      this.props.history.push({
        pathname: '/purchase/purchase_track'
      })
    })
  }

  render () {
    const { status } = this.props
    const mydata = status.toJS()
    const list = _.get(mydata, 'list', [])
    const loading = _.get(mydata, 'loading')
    const pagination = _.get(mydata, 'pagination', {})
    const entryTypeList = _.get(mydata, 'entryTypeList', {})
    const bid = _.get(mydata, 'bid', {})
    const columns = _.get(mydata, 'columns', [])
    return (
      <div className='checkout-entry'>
        <CustomTable
          dataSource={list}
          columns={columns}
          loading={loading}
          pagination={pagination}
          size='middle'
          onChange={this.handleChangeTable}
        />
        { bid.status === 8 &&
          <div className='operation-area'>
            <CustomSelect
              placeholder='请选择入库单类型'
              list={entryTypeList}
            />
            <Button
              type='primary'
              onClick={this.handleCreateEntry}
            >
              生成入库单
            </Button>
            <Button
              type='success'
              onClick={this.handleFinishBid}
            >
              表单完成
            </Button>
          </div>
        }
      </div>
    )
  }
}

CheckoutEntry.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  status: PropTypes.object.isRequired,
  getBidDataAction: PropTypes.func.isRequired,
  getListDataAction: PropTypes.func.isRequired,
  getOrderDataAction: PropTypes.func.isRequired,
  addOrderDataAction: PropTypes.func.isRequired
}

export default CheckoutEntry
