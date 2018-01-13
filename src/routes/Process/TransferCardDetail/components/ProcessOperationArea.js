import React from 'react'
import PropTypes from 'prop-types'
import { Button, Divider } from 'antd'

class ProcessOperationArea extends React.Component {
  constructor (props) {
    super(props)
  }

  handleEditCardProcess = (e) => {
    const { type } = e.target.dataset
    const { onEdit } = this.props
    onEdit && onEdit({
      type
    })
  }

  handleDeleteCardProcess = (e) => {
    const { id } = e.target.dataset
    const { onDelete } = this.props
    onDelete && onDelete(+id)
  }

  handleMoveCardProcess = (e) => {
    const { id, direction } = e.target.dataset
    const { onMove } = this.props
    onMove && onMove({
      id: +id,
      direction: +direction
    })
  }

  render () {
    const { id, disabled } = this.props
    return (
      <div className='process-operation-area'>
        <Button
          type='primary'
          shape='circle'
          icon='edit'
          size='small'
          disabled={disabled}
          data-type='edit'
          onClick={this.handleEditCardProcess}
        />
        <Divider type='vertical' />
        <Button
          type='primary'
          shape='circle'
          icon='plus'
          size='small'
          data-type='add'
          onClick={this.handleEditCardProcess}
        />
        <Divider type='vertical' />
        <Button
          type='danger'
          shape='circle'
          icon='delete'
          size='small'
          disabled={disabled}
          data-id={id}
          onClick={this.handleDeleteCardProcess}
        />
        <Divider type='vertical' />
        <Button
          shape='circle'
          icon='arrow-up'
          size='small'
          disabled={disabled}
          data-id={id}
          data-direction={0}
          onClick={this.handleMoveCardProcess}
        />
        <Divider type='vertical' />
        <Button
          shape='circle'
          icon='arrow-down'
          size='small'
          disabled={disabled}
          data-id={id}
          data-direction={1}
          onClick={this.handleMoveCardProcess}
        />
      </div>
    )
  }
}

ProcessOperationArea.propTypes = {
  id: PropTypes.number,
  disabled: PropTypes.bool,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onMove: PropTypes.func.isRequired
}

ProcessOperationArea.defaultTypes = {
  disabled: false
}

export default ProcessOperationArea
