import React from 'react'
import PropTypes from 'prop-types'
import QueryString from 'query-string'
import _ from 'lodash'
import util, { makeFields } from 'utils'
import fetchAPI from 'api'
import { apis } from 'api/config'
import { Form, Button, Divider, Popconfirm, message } from 'antd'

import ExecutionForm from './ExecutionForm'
import CustomTable from 'components/CustomTable'
import DetailModal from './DetailModal'
import EditModal from './EditModal'
import './MaterialExecutionDetail.less'

const addColumns = [
  'sub_order', 'batch_number_execution', 'material_name_execution', 'material_uid', 'material_category',
  'spec', 'count', 'weight_execution', 'quota', 'part', 'oddments', 'remark', 'action'
]
const checkColumns = [
  'sub_order', 'batch_number_execution', 'material_name_execution', 'material_uid', 'material_category',
  'spec', 'count', 'weight_execution', 'quota', 'part', 'oddments', 'remark'
]

class MaterialExecutionDetail extends React.Component {
  constructor (props) {
    super(props)
    const query = QueryString.parse(this.props.location.search)
    this._id = query.id && +query.id
    this._columns = this.buildColumns()
  }

  componentDidMount () {
    if (!_.isUndefined(this._id)) {
      this.props.getExecutionDataAction({
        id: this._id
      })
      this.props.getListDataAction({
        params: {
          material_execution: this._id
        }
      })
    }
  }

  componentWillUnmount () {
    this.props.resetDataAction()
  }

  buildColumns () {
    const columns = _.isUndefined(this._id) ? addColumns : checkColumns
    return util.buildColumns(columns, {
      action: {
        render: (text, record, index) => {
          return (
            <div>
              <Button
                type='primary'
                size='small'
                data-fields-value={JSON.stringify(record)}
                onClick={this.handleOpenEditModal}
              >
                修改
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

  handleChange = (field, value) => {
    if (field === 'material_type') {
      this.props.changeListDataAction({
        list: []
      })
    }
    this.props.changeExecutionDataAction({
      [field]: value
    })
  }

  handleOpenDetailModal = (e) => {
    const materialType = +this.props.form.getFieldValue('material_type')
    this.props.getDetailListDataAction({
      params: {
        status: 3,
        material_type: materialType
      },
      callback: () => {
        this.props.changeDetailModalAction({
          visible: true,
          title: materialType === 0 ? '主材明细' : '辅材明细'
        })
      }
    })
  }

  handleCloseDetailModal = (e) => {
    this.props.changeDetailModalAction({
      visible: false
    })
  }

  handleAddDetails = (selectedIdList) => {
    const mydata = this.props.status.toJS()
    let detailList = _.get(mydata, 'detailList', [])
    const list = _.get(mydata, 'list', [])
    let seleteList = _.filter(detailList, (item) => {
      return _.includes(selectedIdList, item.id)
    })
    this.props.changeListDataAction({
      list: seleteList.concat(list)
    })
    this.handleCloseDetailModal()
  }

  handleDelete = (id) => {
    return (e) => {
      const mydata = this.props.status.toJS()
      let list = _.get(mydata, 'list', [])
      list = _.filter(list, (item) => {
        return item.id !== id
      })
      this.props.changeListDataAction({
        list
      })
    }
  }

  handleOpenEditModal = (e) => {
    const { fieldsValue } = e.target.dataset
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

  handleSaveDetail = (id, fieldsValue) => {
    const mydata = this.props.status.toJS()
    const list = _.get(mydata, 'list', [])
    const detail = _.find(list, (item) => {
      return item.id === id
    })
    _.forEach(fieldsValue, (value, key) => {
      detail[key] = value
    })
    this.props.changeListDataAction({
      list
    })
    this.handleCloseEditModal()
  }

  handleSaveExecution = (e) => {
    const { status, form } = this.props
    const mydata = status.toJS()
    const list = _.get(mydata, 'list', [])
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      if (list.length === 0) {
        message.warning('请添加材料执行表明细！')
        return
      }
      const executionDetails = _.map(list, (item) => {
        return {
          material: item.id,
          quota: item.quota,
          part: item.part,
          oddments: item.oddments,
          remark: item.remark
        }
      })
      fetchAPI(apis.PurchaseAPI.addMaterialExecution, {
        ...values,
        execution_details: executionDetails
      }).then((repos) => {
        message.success('添加成功！')
        this.props.history.push({
          pathname: '/purchase/material_execution'
        })
      })
    })
  }

  render () {
    const { status, form } = this.props
    const mydata = status.toJS()
    const list = _.get(mydata, 'list', [])
    const detailList = _.get(mydata, 'detailList', [])
    const loading = _.get(mydata, 'loading')
    const detailModal = _.get(mydata, 'detailModal', {})
    const editModal = _.get(mydata, 'editModal', {})
    const disabledIdList = _.map(list, (item) => (item.id))
    return (
      <div className='material-execution-detail'>
        <Form>
          <ExecutionForm
            form={form}
            disabled={!_.isUndefined(this._id)}
            onChange={this.handleChange}
          />
          { _.isUndefined(this._id) &&
            <Button
              type='success'
              onClick={this.handleOpenDetailModal}
            >
              选择材料执行表明细
            </Button>
          }
          <CustomTable
            dataSource={list}
            columns={this._columns}
            loading={loading}
            pagination={false}
            size='middle'
          />
          <Button
            className='save-btn'
            type='primary'
            htmlType='submit'
            onClick={this.handleSaveExecution}
          >
            保存
          </Button>
        </Form>
        { detailModal.visible &&
          <DetailModal
            {...detailModal}
            list={detailList}
            disabledList={disabledIdList}
            onOk={this.handleAddDetails}
            onCancel={this.handleCloseDetailModal}
          />
        }
        { editModal.visible &&
          <EditModal
            {...editModal}
            onOk={this.handleSaveDetail}
            onCancel={this.handleCloseEditModal}
          />
        }
      </div>
    )
  }
}

MaterialExecutionDetail.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  status: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  getExecutionDataAction: PropTypes.func.isRequired,
  getListDataAction: PropTypes.func.isRequired,
  changeListDataAction: PropTypes.func.isRequired,
  getDetailListDataAction: PropTypes.func.isRequired,
  changeDetailModalAction: PropTypes.func.isRequired,
  changeEditModalAction: PropTypes.func.isRequired,
  changeExecutionDataAction: PropTypes.func.isRequired,
  resetDataAction: PropTypes.func.isRequired
}

const WrappedForm = Form.create({
  mapPropsToFields (props) {
    const mydata = props.status.toJS()
    const execution = _.get(mydata, 'execution', [])
    return makeFields(execution)
  }
})(MaterialExecutionDetail)

export default WrappedForm
