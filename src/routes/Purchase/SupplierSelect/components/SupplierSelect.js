import React from 'react'
import PropTypes from 'prop-types'
import QueryString from 'query-string'
import _ from 'lodash'
import util from 'utils'
import fetchAPI from 'api'
import { apis } from 'api/config'
import { Button, Checkbox, Popconfirm, message } from 'antd'

import OrderForm from 'components/OrderForm'
import FilterBar from './FilterBar'
import CustomTable from 'components/CustomTable'
import QuotationModal from './QuotationModal'
import './SupplierSelect.less'

const columns = [
  'selected', 'supplier_uid', 'supplier_name', 'supplier_file', 'price'
]

class SupplierSelect extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      checkedList: []
    }
    const query = QueryString.parse(this.props.location.search)
    this._id = +query.id
    this._columns = this.buildColumns()
  }

  componentDidMount () {
    if (!_.isUndefined(this._id)) {
      this.fetchData(this._query())
    }
  }

  fetchData (query, callback) {
    this.props.getListDataAction({
      params: {
        id: this._id,
        ...query
      },
      callback
    })
  }

  buildColumns () {
    return util.buildColumns(columns, {
      selected: {
        render: (text, record, index) => {
          return record.selected ? '已选择' : (
            <Checkbox
              id={record.id}
              onChange={this.handleChangeCheckbox}
            />
          )
        }
      },
      supplier_file: {
        render: (text, record, index) => {
          return record.docs.length > 0 ? (
            <div>
              {
                _.map(record.docs, (doc, index) => {
                  return (
                    <a
                      className='document-link'
                      key={index}
                      href={doc.path}
                      download={doc.doc_name}
                    >
                      {doc.doc_name}
                    </a>
                  )
                })
              }
            </div>
          ) : ''
        }
      },
      price: {
        render: (text, record, index) => {
          return (
            <Button
              type='primary'
              size='small'
              data-id={record.id}
              onClick={this.handleOpenQuotationModal}
            >
              报价
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
    this.fetchData(query, () => {
      this.setState({
        checkedList: []
      })
    })
  }

  handleChangeTable = (pagination, filters, sorter) => {
    this.updateQuery({
      page: pagination.current > 1 ? pagination.current : ''
    })
  }

  handleOpenQuotationModal = (e) => {
    const { id } = e.target.dataset
    fetchAPI(apis.PurchaseAPI.getSupplierQuotations, { supplier: +id }).then((repos) => {
      this.props.changeQuotationModalAction({
        visible: true,
        list: repos.results
      })
    })
  }

  handleCloseQuotationModal = () => {
    this.props.changeQuotationModalAction({
      visible: false
    })
  }

  handleChangeCheckbox = (e) => {
    let { checked, id } = e.target
    id = +id
    let { checkedList } = this.state
    if (checked) {
      checkedList.push(id)
    } else {
      checkedList = _.filter(checkedList, (item) => {
        return item !== id
      })
    }
    this.setState({
      checkedList
    })
  }

  handleConfirm = () => {
    let { checkedList } = this.state
    fetchAPI(apis.PurchaseAPI.addSupplyRelationship, {
      suppliers: checkedList,
      bidding_sheet: this._id
    }).then((repos) => {
      message.success('选择成功！')
      this.updatelist()
    })
  }

  handleReset = () => {
    fetchAPI(apis.PurchaseAPI.resetSupplyRelationships, {}, { id: this._id }).then((repos) => {
      message.success('重置成功！')
      this.updatelist()
    })
  }

  handleSubmit = () => {
    fetchAPI(apis.PurchaseAPI.updateBiddingSheet, { status: 2 }, { id: this._id }).then(() => {
      message.success('操作成功！')
      this.props.history.push({
        pathname: '/purchase/purchase_track'
      })
    })
  }

  render () {
    const { status, location } = this.props
    const query = QueryString.parse(location.search)
    const mydata = status.toJS()
    const list = _.get(mydata, 'list', [])
    const loading = _.get(mydata, 'loading')
    const pagination = _.get(mydata, 'pagination', {})
    const quotationModal = _.get(mydata, 'quotationModal', {})
    return (
      <div className='supplier-select'>
        <OrderForm
          bidId={this._id}
        />
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
        <div className='operation-area'>
          <Button
            type='primary'
            onClick={this.handleConfirm}
          >
            供应商选择确认
          </Button>
          <Popconfirm
            title='确定重置吗？'
            onConfirm={this.handleReset}
            okText='确定'
            cancelText='取消'
          >
            <Button
              type='danger'
            >
              供应商选择重置
            </Button>
          </Popconfirm>
          <Button
            type='success'
            onClick={this.handleSubmit}
          >
            供应商选择提交
          </Button>
        </div>
        { quotationModal.visible &&
          <QuotationModal
            {...quotationModal}
            onOk={this.handleCloseQuotationModal}
            onCancel={this.handleCloseQuotationModal}
          />
        }
      </div>
    )
  }
}

SupplierSelect.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  status: PropTypes.object.isRequired,
  getListDataAction: PropTypes.func.isRequired,
  changeQuotationModalAction: PropTypes.func.isRequired
}

export default SupplierSelect
