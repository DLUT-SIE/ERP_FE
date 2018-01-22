import React from 'react'
import PropTypes from 'prop-types'
import util from 'utils'
import _ from 'lodash'
import { Modal } from 'antd'

import CustomTable from 'components/CustomTable'

const columns = [
  'sub_order', 'batch_number_execution', 'material_name_execution', 'material_uid', 'material_category',
  'spec', 'count', 'weight_execution'
]

class DetailModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedIdList: []
    }
    this._columns = this.buildColumns()
  }

  buildColumns () {
    return util.buildColumns(columns, {})
  }

  handleSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({
      selectedIdList: selectedRowKeys
    })
  }

  getDisabledList = (record) => {
    const { disabledList } = this.props
    return {
      disabled: _.includes(disabledList, record.id)
    }
  }

  handleSave = (e) => {
    const { onOk } = this.props
    let { selectedIdList } = this.state
    selectedIdList = _.map(selectedIdList, (item) => {
      return +item
    })
    onOk && onOk(selectedIdList)
  }

  render () {
    const { visible, title, list, onCancel } = this.props
    const rowSelection = {
      onChange: this.handleSelectChange,
      getCheckboxProps: this.getDisabledList
    }
    return (
      <Modal
        className='detail-modal'
        title={title}
        width={1200}
        visible={visible}
        onOk={this.handleSave}
        onCancel={onCancel}
      >
        <CustomTable
          dataSource={list}
          columns={this._columns}
          rowSelection={rowSelection}
          pagination={false}
          size='middle'
        />
      </Modal>
    )
  }
}

DetailModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
  disabledList: PropTypes.array.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
}

export default DetailModal
