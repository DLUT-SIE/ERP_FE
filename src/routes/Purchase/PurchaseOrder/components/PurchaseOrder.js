import React from 'react'
import PropTypes from 'prop-types'
import QueryString from 'query-string'
import _ from 'lodash'
import util from 'utils'
import fetchAPI from 'api'
import { apis } from 'api/config'
import { Button, Input, message } from 'antd'

import PurchaseOrderInfo from './PurchaseOrderInfo'
import CustomTable from 'components/CustomTable'
import EditModal from './EditModal'
import './PurchaseOrder.less'

const { TextArea } = Input
const columns = [
  'sub_order', 'ticket_number_order', 'name_order', 'spec_order', 'drawing_number_order', 'material_order', 'count_order',
  'piece_weight_order', 'total_weight_order', 'remark_order', 'delivery_dt', 'action'
]

class PurchaseOrder extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      textAreaDisabled: true,
      techRequirement: ''
    }
    this._columns = this.buildColumns()
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
      }
    })
    this.props.getListDataAction({
      params: this._query()
    })
  }

  buildColumns () {
    return util.buildColumns(columns, {
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

  handleOpenEditModal = (e) => {
    const { fieldsValue } = e.currentTarget.dataset
    console.log('fieldsValue', fieldsValue)
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
    const editModal = _.get(mydata, 'editModal', {})
    const { textAreaDisabled, techRequirement } = this.state
    return (
      <div className='purchase-order'>
        <PurchaseOrderInfo
          fieldsValue={purchaseOrderInfo}
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
        <TextArea
          className='tech-requirement-textarea'
          rows={5}
          value={techRequirement}
          onChange={this.handleChangeTextArea}
          disabled={textAreaDisabled}
        />
        <Button
          className='edit-btn'
          type='primary'
          onClick={this.handleEditTechRequirement}
        >
          {textAreaDisabled ? '填写技术要求' : '保存'}
        </Button>
        <Button type='primary'>完成</Button>
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
