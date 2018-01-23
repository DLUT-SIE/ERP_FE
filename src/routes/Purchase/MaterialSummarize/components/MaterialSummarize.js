import React from 'react'
import PropTypes from 'prop-types'
import QueryString from 'query-string'
import _ from 'lodash'
import util from 'utils'
import fetchAPI from 'api'
import { apis } from 'api/config'
import { Button, Checkbox, Popconfirm, message } from 'antd'

import FilterBar from './FilterBar'
import PurchaseOrder from './PurchaseOrder'
import CustomTable from 'components/CustomTable'
import OrderModal from './OrderModal'
import OrderSelectModal from './OrderSelectModal'
import './MaterialSummarize.less'

const columns0 = [
  'add', 'sub_order', 'name_order', 'spec_order', 'material_order', 'count_order', 'weight',
  'total_weight', 'material_status', 'action'
]
const columns1 = [
  'add', 'sub_order', 'name_order', 'spec_order', 'drawing_number_order', 'material_order', 'count_order',
  'total_weight', 'material_status', 'action'
]
const columns2 = [
  'add', 'sub_order', 'name_order', 'spec_order', 'drawing_number_order', 'material_order', 'count_order',
  'total_weight', 'material_status', 'action'
]
const columns3 = [
  'add', 'sub_order', 'name_order', 'spec_order', 'drawing_number_order', 'material_order', 'count_order',
  'total_weight', 'material_status', 'action'
]
const columns4 = [
  'add', 'sub_order', 'name_order', 'spec_order', 'material_order', 'quota', 'remark_order', 'material_status',
  'action'
]
const columns5 = [
  'add', 'sub_order', 'name_order', 'drawing_number_order', 'ticket_number_order', 'material_order', 'count_order',
  'weight', 'total_weight', 'material_status', 'action'
]

const typeMap = {
  0: {
    columns: columns0
  },
  1: {
    columns: columns1
  },
  2: {
    columns: columns2
  },
  3: {
    columns: columns3
  },
  4: {
    columns: columns4
  },
  5: {
    columns: columns5
  }
}

class MaterialSummarize extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      checkedList: []
    }
  }

  componentDidMount () {
    const query = this._query()
    this.props.getListDataAction({
      params: query,
      callback: (materialData, purchaseOrderData) => {
        this.setState({
          checkedBoolList: _.map(materialData.results, (item) => {
            return false
          })
        }, () => {
          const columns = this.buildColumns(typeMap[query.inventory_type].columns)
          this.props.addListDataAction({ materialData, purchaseOrderData, columns })
        })
      }
    })
  }

  buildColumns (columns) {
    const { checkedBoolList } = this.state
    return util.buildColumns(columns, {
      add: {
        render: (text, record, index) => {
          return record.status === 1 ? (
            <Checkbox
              checked={checkedBoolList[index]}
              onChange={this.handleChangeCheckbox(record, index)}
            />
          ) : ''
        }
      },
      action: {
        render: (text, record, index) => {
          return (
            <Popconfirm
              title='确定完成吗？'
              onConfirm={this.handleFinished(record.id)}
              okText='确定'
              cancelText='取消'
            >
              <Button
                type='danger'
                size='small'
              >
                完成
              </Button>
            </Popconfirm>
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
      page: 1,
      inventory_type: 0,
      finished: false
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
      params: this._query(query),
      callback: (materialData, purchaseOrderData) => {
        this.setState({
          checkedBoolList: _.map(materialData.results, (item) => {
            return false
          })
        }, () => {
          const columns = this.buildColumns(typeMap[query.inventory_type].columns)
          this.props.addListDataAction({ materialData, purchaseOrderData, columns })
        })
      }
    })
  }

  handleChangeTable = (pagination, filters, sorter) => {
    this.updateQuery({
      page: pagination.current > 1 ? pagination.current : ''
    })
  }

  handleFinished = (id) => {
    return (e) => {
      fetchAPI(apis.PurchaseAPI.updateProcurementMaterial, { finished: true }, { id }).then((repos) => {
        message.success('操作成功！')
        this.updatelist()
      })
    }
  }

  handleChangeCheckbox = (record, index) => {
    return (e) => {
      const { checked } = e.target
      let { checkedBoolList, checkedList } = this.state
      if (checked) {
        checkedList.push(record)
      } else {
        checkedList = _.filter(checkedList, (item) => {
          return item.id !== record.id
        })
      }
      checkedBoolList[index] = !checkedBoolList[index]
      this.setState({
        checkedList,
        checkedBoolList: checkedBoolList
      })
    }
  }

  handleOpenOrderModal = (id, uid, list = []) => {
    const query = QueryString.parse(this.props.location.search)
    if (_.isUndefined(query.inventory_type)) {
      query.inventory_type = 0
    }
    const type = +query.inventory_type < 2 ? 'type0' : 'type1'
    const params = {
      visible: true,
      list: [],
      type
    }
    if (!_.isUndefined(id)) {
      fetchAPI(apis.PurchaseAPI.getProcurementMaterials, { purchase_order_uid: uid }).then((repos) => {
        list = _.map(list, (item) => {
          item.pretty_status = '待加入'
          return item
        })
        params.list = list.concat(repos.results)
        params.addList = list
        params.id = id
        params.uid = uid
        this.props.changeOrderModalAction(params)
      })
    } else {
      this.props.changeOrderModalAction(params)
    }
  }

  handleCloseOrderModal = () => {
    this.props.changeOrderModalAction({
      visible: false
    })
  }

  handleDelete = (id) => {
    fetchAPI(apis.PurchaseAPI.deletePurchaseOrder, {}, { id }).then((repos) => {
      message.success('删除成功！')
      this.handleCloseOrderModal()
      this.updatelist()
    })
  }

  handleSaveOrder = (id, uid, list = []) => {
    if (_.isUndefined(id)) {
      fetchAPI(apis.PurchaseAPI.addPurchaseOrders, { uid }).then((repos) => {
        message.success('订购单创建成功！')
        this.handleCloseOrderModal()
        this.updatelist()
      })
    } else {
      fetchAPI(apis.PurchaseAPI.updatePurchaseOrder, { uid }, { id }).then((repos) => {
        message.success('订购单修改成功！')
        this.handleCloseOrderModal()
        this.updatelist()
      })
      _.forEach(list, (item) => {
        fetchAPI(apis.PurchaseAPI.updateProcurementMaterial, { purchase_order: id }, { id: item.id })
      })
      this.setState({
        checkedList: []
      })
    }
  }

  handleAddToOrder = () => {
    const { checkedList } = this.state
    if (checkedList.length === 0) {
      message.warning('请先选择要添加的采购物料！')
      return
    }
    this.props.changeOrderSelectModalAction({
      visible: true
    })
  }

  handleCloseOrderSelectModal = (e) => {
    this.props.changeOrderSelectModalAction({
      visible: false
    })
  }

  handleChangeToOrderModal = (id, uid) => {
    const { checkedList } = this.state
    this.handleCloseOrderSelectModal()
    this.handleOpenOrderModal(id, uid, checkedList)
  }

  handleAddToExecution = () => {
    const { checkedList } = this.state
    if (checkedList.length === 0) {
      message.warning('请先选择要添加的采购物料！')
      return
    }
    _.forEach(checkedList, (item) => {
      fetchAPI(apis.PurchaseAPI.updateProcurementMaterial, { status: 3 }, { id: item.id })
    })
  }

  render () {
    const { status, location } = this.props
    const query = QueryString.parse(location.search)
    const mydata = status.toJS()
    const list = _.get(mydata, 'list', [])
    const purchaseOrderList = _.get(mydata, 'purchaseOrderList', [])
    const loading = _.get(mydata, 'loading')
    const pagination = _.get(mydata, 'pagination', {})
    const columns = _.get(mydata, 'columns', {})
    const orderModal = _.get(mydata, 'orderModal', {})
    const orderSelectModal = _.get(mydata, 'orderSelectModal', {})
    return (
      <div className='material-summarize'>
        <FilterBar
          fieldsValue={query}
          onSearch={this.handleSearch}
        />
        <PurchaseOrder
          list={purchaseOrderList}
          onOk={this.handleOpenOrderModal}
        />
        <CustomTable
          dataSource={list}
          columns={columns}
          loading={loading}
          pagination={pagination}
          size='middle'
          onChange={this.handleChangeTable}
        />
        <div className='material-operation-area'>
          <Button
            type='primary'
            onClick={this.handleAddToOrder}
          >
            加入采购单
          </Button>
          <Popconfirm
            title='确定添加至材料执行吗？'
            onConfirm={this.handleAddToExecution}
            okText='确定'
            cancelText='取消'
          >
            <Button
              type='success'
            >
              添加至材料执行
            </Button>
          </Popconfirm>
        </div>
        { orderModal.visible &&
          <OrderModal
            {...orderModal}
            onSave={this.handleSaveOrder}
            onDelete={this.handleDelete}
            onOk={this.handleCloseOrderModal}
            onCancel={this.handleCloseOrderModal}
          />
        }
        { orderSelectModal.visible &&
          <OrderSelectModal
            {...orderSelectModal}
            list={purchaseOrderList}
            onOk={this.handleChangeToOrderModal}
            onCancel={this.handleCloseOrderSelectModal}
          />
        }
      </div>
    )
  }
}

MaterialSummarize.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  status: PropTypes.object.isRequired,
  getListDataAction: PropTypes.func.isRequired,
  addListDataAction: PropTypes.func.isRequired,
  changeOrderModalAction: PropTypes.func.isRequired,
  changeOrderSelectModalAction: PropTypes.func.isRequired
}

export default MaterialSummarize
