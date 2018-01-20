import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'

import './ItemOperationArea.less'

class ItemOperationArea extends React.Component {
  constructor (props) {
    super(props)
  }

  handleEdit = () => {
    const { index, onEdit } = this.props
    onEdit && onEdit(index)
  }

  render () {
    return (
      <div className='item-operation-area'>
        <Button
          type='primary'
          shape='circle'
          icon='edit'
          size='small'
          onClick={this.handleEdit}
        />
      </div>
    )
  }
}

ItemOperationArea.propTypes = {
  index: PropTypes.number.isRequired,
  onEdit: PropTypes.func.isRequired
}

export default ItemOperationArea
