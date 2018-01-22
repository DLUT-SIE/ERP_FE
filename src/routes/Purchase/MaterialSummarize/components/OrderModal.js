import React from 'react'
import PropTypes from 'prop-types'
import util from 'utils'
import _ from 'lodash'
import { Modal, Input, Button, Popconfirm, message } from 'antd'

import CustomTable from 'components/CustomTable'
import './OrderModal.less'

const columns = [
  'sub_order', 'batch_number_execution', 'material_name_execution', 'material_uid', 'material_category',
  'spec', 'count', 'weight_execution'
]

class OrderModal extends React.Component {
  constructor (props) {
    super(props)
    this._columns = this.buildColumns()
  }

  componentWillMount () {
    this.setState({
      uid: this.props.uid
    })
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      uid: nextProps.uid
    })
  }

  buildColumns () {
    return util.buildColumns(columns, {})
  }

  handleChange = (e) => {
    const value = e.target.value
    this.setState({
      uid: value
    })
  }

  handleDelete = (id) => {
    return (e) => {
      const { onDelete } = this.props
      onDelete && onDelete(id)
    }
  }

  handleSave = (e) => {
    const { onSave, id, addList } = this.props
    const { uid } = this.state
    if (_.isUndefined(uid)) {
      message.warning('请输入订购单编号！')
      return
    }
    onSave && onSave(id, uid, addList)
  }

  render () {
    const { visible, id, list, onOk, onCancel } = this.props
    const { uid } = this.state
    return (
      <Modal
        className='purchase-order-modal'
        title='订购单信息'
        width={1200}
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}
      >
        <div className='ant-form-item'>
          <div className='ant-form-item-label'>
            <label>订购单编号</label>
          </div>
          <div className='ant-form-item-control'>
            <Input
              value={uid}
              onChange={this.handleChange}
              placeholder='请输入订购单编号'
            />
          </div>
        </div>
        <CustomTable
          dataSource={list}
          columns={this._columns}
          pagination={false}
          size='middle'
        />
        <div className='operation-area'>
          <Button
            type='primary'
            onClick={this.handleSave}
          >
            { _.isUndefined(id) ? '创建订购单' : '保存订购单' }
          </Button>
          { id &&
            <Popconfirm
              title='确定删除该订购单吗？'
              onConfirm={this.handleDelete(id)}
              okText='确定'
              cancelText='取消'
            >
              <Button
                type='danger'
              >
                删除订购单
              </Button>
            </Popconfirm>
          }
        </div>
      </Modal>
    )
  }
}

OrderModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  id: PropTypes.number,
  uid: PropTypes.string,
  list: PropTypes.array.isRequired,
  addList: PropTypes.array,
  onSave: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
}

export default OrderModal
