import React from 'react'
import PropTypes from 'prop-types'
import util from 'utils'
import { Modal } from 'antd'

import CustomTable from 'components/CustomTable'

const columns = [
  'pretty_inventory_type', 'name_spec', 'material_mark_quotation', 'unit_price', 'unit', 'quotation'
]

class QuotationModal extends React.Component {
  constructor (props) {
    super(props)
    this._columns = this.buildColumns()
  }

  buildColumns () {
    return util.buildColumns(columns, {})
  }

  render () {
    const { visible, list, onOk, onCancel } = this.props
    return (
      <Modal
        title='供应商报价'
        width={1000}
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}
      >
        <CustomTable
          dataSource={list}
          columns={this._columns}
          pagination={false}
          size='middle'
        />
      </Modal>
    )
  }
}

QuotationModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  list: PropTypes.array.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
}

export default QuotationModal
