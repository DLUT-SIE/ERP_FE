import React from 'react'
import PropTypes from 'prop-types'
import QueryString from 'query-string'
import _ from 'lodash'
import util from 'utils'
import fetchAPI from 'api'
import { apis } from 'api/config'
import { Button, Divider, Popconfirm, message } from 'antd'

import CustomTable from 'components/CustomTable'
import QuotationModal from './QuotationModal'
import './Quotation.less'

const columns = [
  'pretty_inventory_type', 'name_spec', 'material_mark_quotation', 'unit_price', 'unit', 'action'
]

class Quotation extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    const query = QueryString.parse(this.props.location.search)
    this._id = +query.id
    this._uid = +query.uid
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
            <span>
              <Button
                type='primary'
                size='small'
                data-fields-value={JSON.stringify(record)}
                onClick={this.handleOpenModal}
              >
                编辑
              </Button>
              <Divider type='vertical' />
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

  _query (query = {}) {
    const oldQuery = QueryString.parse(this.props.location.search)
    return Object.assign({
      page: 1,
      id: this._id
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

  handleOpenModal = (e) => {
    let { fieldsValue } = e.target.dataset
    fieldsValue = fieldsValue ? JSON.parse(fieldsValue) : {}
    this.props.changeModalAction({
      visible: true,
      fieldsValue: fieldsValue
    })
  }

  handleCloseModal = (e) => {
    this.props.changeModalAction({
      visible: false
    })
  }

  handleSaveQuotation = (id, fieldsValue) => {
    if (_.isUndefined(id)) {
      fetchAPI(apis.PurchaseAPI.addSupplierQuotation, {
        ...fieldsValue,
        supplier: this._id
      }).then((repos) => {
        message.success('添加成功！')
        this.handleCloseModal()
        this.updatelist()
      })
    } else {
      fetchAPI(apis.PurchaseAPI.updateSupplierQuotation, fieldsValue, { id }).then((repos) => {
        message.success('编辑成功！')
        this.handleCloseModal()
        this.updatelist()
      })
    }
  }

  handleDelete = (id) => {
    return (e) => {
      fetchAPI(apis.PurchaseAPI.deleteSupplierQuotation, {}, { id }).then((repos) => {
        message.success('删除成功！')
        this.props.getListDataAction({
          params: this._query()
        })
      })
    }
  }

  render () {
    const { status } = this.props
    const mydata = status.toJS()
    const list = _.get(mydata, 'list', [])
    const loading = _.get(mydata, 'loading')
    const pagination = _.get(mydata, 'pagination', {})
    const modal = _.get(mydata, 'modal', {})
    return (
      <div className='quotation'>
        <h1 className='title'>供应商编号：{this._uid}</h1>
        <Button
          className='add-btn'
          type='success'
          onClick={this.handleOpenModal}
        >
          添加
        </Button>
        <CustomTable
          dataSource={list}
          columns={this._columns}
          loading={loading}
          pagination={pagination}
          size='middle'
          onChange={this.handleChangeTable}
        />
        { modal.visible &&
          <QuotationModal
            {...modal}
            onOk={this.handleSaveQuotation}
            onCancel={this.handleCloseModal}
          />
        }
      </div>
    )
  }
}

Quotation.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  status: PropTypes.object.isRequired,
  getListDataAction: PropTypes.func.isRequired,
  changeModalAction: PropTypes.func.isRequired
}

export default Quotation
