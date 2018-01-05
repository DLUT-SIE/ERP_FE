import React from 'react'
import PropTypes from 'prop-types'
import QueryString from 'query-string'
import _ from 'lodash'
import util from 'utils'
import fetchAPI from 'api'
import { apis } from 'api/config'
import { Button, Input, Checkbox, message } from 'antd'

import PurchaseOrderInfo from './PurchaseOrderInfo'
import CustomTable from 'components/CustomTable'
import EditModal from './EditModal'
import './PurchaseOrder.less'

const { TextArea } = Input
const columns = [
  'sub_order', 'ticket_number_order', 'name_order', 'spec_order', 'drawing_number_order', 'material_order', 'count_order',
  'weight', 'total_weight', 'remark_order', 'delivery_dt', 'action'
]
const columnsCategory0 = [
  'add', 'sub_order', 'name_order', 'material_order', 'spec_order', 'count_order', 'total_weight_order',
  'remark_order', 'finished', 'action'
]

class PurchaseOrder extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      textAreaDisabled: true,
      techRequirement: '',
      checkedList: []
    }
    this._columns = []
    this._id = +QueryString.parse(props.location.search).purchase_order
  }

  componentDidMount () {
    this.props.getPurchaseOrderAction({
      params: {
        id: this._id
      },
      callback: (repos) => {
        this.setState({
          techRequirement: repos.tech_requirement
        })
        const column = repos.category === 0 ? columnsCategory0 : columns
        this._columns = this.buildColumns(column)
      }
    })
    this.props.getListDataAction({
      params: this._query()
    })
  }

  buildColumns (columns) {
    return util.buildColumns(columns, {
      add: {
        render: (text, record, index) => {
          return record.add_to_detail ? '已添加' : (
            <Checkbox
              onChange={this.handleChangeCheckbox(record.id)}
            />
          )
        }
      },
      delivery_dt: {
        render: (text, record, index) => {
          return record.delivery_dt && record.delivery_dt.split('T')[0]
        }
      },
      finished: {
        render: (text, record, index) => {
          return record.finished ? '已结束' : '未结束'
        }
      },
      action: {
        render: (text, record, index) => {
          return (
            <Button
              type='primary'
              size='small'
              data-fields-value={JSON.stringify(record)}
              onClick={this.handleOpenEditModal}
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

  handleChangeCheckbox = (id) => {
    return (e) => {
      const { checked } = e.target
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
  }

  handleMergeMaterial = (e) => {
    const { checkedList } = this.state
    if (!checkedList.length) {
      message.warning('请先选择采购物料！')
      return
    }
    fetchAPI(apis.PurchaseAPI.mergeMaterials, checkedList).then((repos) => {
      message.success('合并成功')
      this.updatelist()
    })
  }

  handleOpenEditModal = (e) => {
    const { fieldsValue } = e.currentTarget.dataset
    this.props.changeEditModalAction({
      visible: true,
      fieldsValue: JSON.parse(fieldsValue)
    })
  }

  handleCloseEditModal = (e) => {
    this.props.changeEditModalAction({
      visible: false
    })
  }

  handleSaveProcurementMaterials = (id, fieldsValue) => {
    const { url, method } = apis.PurchaseAPI.updateProcurementMaterial
    const api = {
      url: url(id),
      method
    }
    fetchAPI(api, fieldsValue).then((repos) => {
      this.handleCloseEditModal()
      message.success('修改成功！')
      this.updatelist()
    })
  }

  handleChangeTextArea = (e) => {
    const value = e.target.value
    this.setState({
      techRequirement: value
    })
  }

  handleEditTechRequirement = (e) => {
    const { textAreaDisabled, techRequirement } = this.state
    if (textAreaDisabled) {
      this.setState({
        textAreaDisabled: !this.state.textAreaDisabled
      })
    } else {
      const { url, method } = apis.PurchaseAPI.updatePurchaseOrder
      const api = {
        url: url(this._id),
        method
      }
      fetchAPI(api, { tech_requirement: techRequirement }).then((repos) => {
        message.success('保存成功！')
        this.setState({
          textAreaDisabled: true
        })
      })
    }
  }

  render () {
    const mydata = this.props.status.toJS()
    const list = _.get(mydata, 'list', [])
    const loading = _.get(mydata, 'loading')
    const pagination = _.get(mydata, 'pagination', {})
    const purchaseOrderInfo = _.get(mydata, 'purchaseOrderInfo', {})
    const editModal = _.get(mydata, 'editModal', {})
    const { textAreaDisabled, techRequirement } = this.state
    return (
      <div className='purchase-order'>
        <PurchaseOrderInfo
          fieldsValue={purchaseOrderInfo}
        />
        { purchaseOrderInfo.category === 0 &&
          <Button
            className='merge-btn'
            type='primary'
            onClick={this.handleMergeMaterial}
          >
            物料合并
          </Button>
        }
        <CustomTable
          style={{ marginTop: 0 }}
          dataSource={list}
          columns={this._columns}
          loading={loading}
          pagination={pagination}
          size='middle'
          onChange={this.handleChangeTable}
        />
        <TextArea
          className='tech-requirement-textarea'
          rows={5}
          value={techRequirement}
          onChange={this.handleChangeTextArea}
          disabled={textAreaDisabled}
        />
        <div className='btn-area'>
          <Button
            className='edit-btn'
            type='primary'
            onClick={this.handleEditTechRequirement}
          >
            {textAreaDisabled ? '填写技术要求' : '保存'}
          </Button>
          <Button type='primary'>完成订购单</Button>
        </div>
        { editModal.visible &&
          <EditModal
            {...editModal}
            onOk={this.handleSaveProcurementMaterials}
            onCancel={this.handleCloseEditModal}
          />
        }
      </div>
    )
  }
}

PurchaseOrder.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  status: PropTypes.object.isRequired,
  getPurchaseOrderAction: PropTypes.func.isRequired,
  getListDataAction: PropTypes.func.isRequired,
  changeEditModalAction: PropTypes.func.isRequired
}

export default PurchaseOrder
