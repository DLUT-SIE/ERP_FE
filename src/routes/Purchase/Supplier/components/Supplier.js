import React from 'react'
import PropTypes from 'prop-types'
import QueryString from 'query-string'
import _ from 'lodash'
import util from 'utils'
import fetchAPI from 'api'
import { apis } from 'api/config'
import { Button, Divider, Popconfirm, message } from 'antd'

import CustomTable from 'components/CustomTable'
import SupplierModal from './SupplierModal'
import './Supplier.less'

const columns = [
  'supplier_uid', 'supplier_name', 'supplier_file', 'quotation', 'upload_supplier_file', 'action'
]

class Supplier extends React.Component {
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
      quotation: {
        render: (text, record, index) => {
          return (
            <Button
              type='primary'
              size='small'
            >
              报价
            </Button>
          )
        }
      },
      upload_supplier_file: {
        render: (text, record, index) => {
          return (
            <Button
              type='primary'
              size='small'
            >
              上传
            </Button>
          )
        }
      },
      action: {
        render: (text, record, index) => {
          return (
            <div>
              <Button
                type='primary'
                size='small'
                data-fields-value={JSON.stringify(record)}
                onClick={this.handleOpenSupplierModal}
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

  handleOpenSupplierModal = (e) => {
    let { fieldsValue } = e.target.dataset
    fieldsValue = fieldsValue ? JSON.parse(fieldsValue) : {}
    this.props.changeSupplierModalAction({
      visible: true,
      fieldsValue
    })
  }

  handleCloseSupplierModal = () => {
    this.props.changeSupplierModalAction({
      visible: false
    })
  }

  handleSaveSupplier = (id, fieldsValue) => {
    if (_.isUndefined(id)) {
      fetchAPI(apis.PurchaseAPI.addSupplier, fieldsValue).then((repos) => {
        message.success('添加成功！')
      })
    } else {
      fetchAPI(apis.PurchaseAPI.updateSupplier, fieldsValue, { id }).then((repos) => {
        message.success('编辑成功！')
      })
    }
    this.handleCloseSupplierModal()
    this.updatelist()
  }

  handleDelete = (id) => {
    return (e) => {
      fetchAPI(apis.PurchaseAPI.deleteSupplier, {}, { id }).then((repos) => {
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
    const supplierModal = _.get(mydata, 'supplierModal', {})
    return (
      <div className='supplier'>
        <Button
          type='success'
          className='add-btn'
          onClick={this.handleOpenSupplierModal}
        >
          添加供应商
        </Button>
        <CustomTable
          dataSource={list}
          columns={this._columns}
          loading={loading}
          pagination={pagination}
          size='middle'
          onChange={this.handleChangeTable}
        />
        { supplierModal.visible &&
          <SupplierModal
            {...supplierModal}
            onOk={this.handleSaveSupplier}
            onCancel={this.handleCloseSupplierModal}
          />
        }
      </div>
    )
  }
}

Supplier.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  status: PropTypes.object.isRequired,
  getListDataAction: PropTypes.func.isRequired,
  changeSupplierModalAction: PropTypes.func.isRequired
}

export default Supplier
