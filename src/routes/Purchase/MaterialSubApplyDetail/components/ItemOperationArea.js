import React from 'react'
import PropTypes from 'prop-types'
import { Button, Divider } from 'antd'

import './ItemOperationArea.less'

class ItemOperationArea extends React.Component {
  constructor (props) {
    super(props)
  }

  handleEdit = () => {
    const { index, onEdit } = this.props
    onEdit && onEdit(index)
  }

  handleDelete = (e) => {
    const { id } = e.target.dataset
    const { onDelete } = this.props
    onDelete && onDelete(+id)
  }

  render () {
    const { id } = this.props
    return (
      <div className='item-operation-area'>
        <Button
          type='primary'
          shape='circle'
          icon='edit'
          size='small'
          onClick={this.handleEdit}
        />
        <Divider type='vertical' />
        <Button
          type='danger'
          shape='circle'
          icon='delete'
          size='small'
          data-id={id}
          onClick={this.handleDelete}
        />
      </div>
    )
  }
}

ItemOperationArea.propTypes = {
  id: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default ItemOperationArea
