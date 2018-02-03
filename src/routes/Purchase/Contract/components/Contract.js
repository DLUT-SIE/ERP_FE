import React from 'react'
import PropTypes from 'prop-types'
import QueryString from 'query-string'
import _ from 'lodash'
import util from 'utils'
import fetchAPI from 'api'
import { apis } from 'api/config'
import { Link } from 'react-router-dom'
import { Button, Divider, message } from 'antd'

import CustomTable from 'components/CustomTable'
import AmountModal from './AmountModal'

const columns = [
  'contract_number', 'accept_supplier', 'content', 'contract_amount', 'billing_amount', 'payable_amounts',
  'prepaid_amounts', 'action'
]

class Contract extends React.Component {
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
                type='success'
                size='small'
                data-id={record.id}
                data-prepaid-amounts={record.prepaid_amounts}
                onClick={this.handleOpenAmountModal}
              >
                添加已付金额
              </Button>
              <Divider type='vertical' />
              <Button
                type='primary'
                size='small'
              >
                <Link to={`/purchase/contract/contract_detail/?id=${record.id}`}>
                  查看已付金额明细
                </Link>
              </Button>
            </div>
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
    this.props.getListDataAction({
      params: query
    })
  }

  handleChangeTable = (pagination, filters, sorter) => {
    this.updateQuery({
      page: pagination.current > 1 ? pagination.current : ''
    })
  }

  handleOpenAmountModal = (e) => {
    let { id, prepaidAmounts } = e.target.dataset
    this.props.changeAmountModalAction({
      visible: true,
      id: +id,
      prepaidAmounts: +prepaidAmounts
    })
  }

  handleCloseAmountModal = () => {
    this.props.changeAmountModalAction({
      visible: false
    })
  }

  handleSaveAmount = (id, fieldsValue) => {
    fetchAPI(apis.PurchaseAPI.addContractDetail, {
      ...fieldsValue,
      bidding_sheet: id
    }).then((repos) => {
      message.success('添加成功！')
      this.handleCloseAmountModal()
      this.updatelist()
    })
  }

  render () {
    const { status } = this.props
    const mydata = status.toJS()
    const list = _.get(mydata, 'list', [])
    const loading = _.get(mydata, 'loading')
    const pagination = _.get(mydata, 'pagination', {})
    const amountModal = _.get(mydata, 'amountModal', {})
    return (
      <div className='contract'>
        <CustomTable
          dataSource={list}
          columns={this._columns}
          loading={loading}
          pagination={pagination}
          size='middle'
          onChange={this.handleChangeTable}
        />
        { amountModal.visible &&
          <AmountModal
            {...amountModal}
            onOk={this.handleSaveAmount}
            onCancel={this.handleCloseAmountModal}
          />
        }
      </div>
    )
  }
}

Contract.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  status: PropTypes.object.isRequired,
  getListDataAction: PropTypes.func.isRequired,
  changeAmountModalAction: PropTypes.func.isRequired
}

export default Contract
