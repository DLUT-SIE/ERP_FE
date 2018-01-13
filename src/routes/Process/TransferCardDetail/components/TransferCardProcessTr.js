import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import ProcessOperationArea from './ProcessOperationArea'

class TransferCardProcessTr extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      show: false
    }
  }

  handleMouseEnter = (e) => {
    this.setState({
      show: true
    })
  }

  handleMouseLeave = (e) => {
    this.setState({
      show: false
    })
  }

  handleEdit = (fieldsValue) => {
    const { process, index, onEdit } = this.props
    onEdit && onEdit({
      ...fieldsValue,
      index,
      fieldsValue: fieldsValue.type === 'edit' ? process : { index: process.index + 1 }
    })
  }

  handleMove = (fieldsValue) => {
    const { index, onMove } = this.props
    onMove && onMove({
      ...fieldsValue,
      index
    })
  }

  render () {
    const { type, process, onDelete } = this.props
    const { show } = this.state
    if (type === 'barrel' || type === 'specialElement') {
      return (
        <tr
          className='process-tr'
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          <td className='order-td'>
            {process.index === 0 ? '' : process.index }
          </td>
          <td className='process-td'>
            {process.name}
          </td>
          <td className='process-request-value-td' colSpan={14}>
            {process.detail}
            { !_.isUndefined(process.index) && show &&
              <ProcessOperationArea
                id={process.id}
                onEdit={this.handleEdit}
                onDelete={onDelete}
                onMove={this.handleMove}
              />
            }
          </td>
          <td className='name-td' colSpan={4} />
          <td className='first-date-td' colSpan={2} />
          <td className='name-td' colSpan={3} />
          <td className='second-date-td' />
        </tr>
      )
    } else {
      return (
        <tr
          className='control-unit-tr'
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          <td className='order-td'>
            {process.index === 0 ? '' : process.index }
          </td>
          <td className='process-td' colSpan={6}>
            {`${process.name || ''}${(process.name && process.detail) ? ':' : ''}${process.detail || ''}`}
            { !_.isUndefined(process.index) && show &&
              <ProcessOperationArea
                disabled={process.index === 0}
                id={process.id}
                onEdit={this.handleEdit}
                onDelete={onDelete}
                onMove={this.handleMove}
              />
            }
          </td>
          <td className='group-td' colSpan={3} />
          <td className='operator-td' colSpan={2} />
          <td className='first-date-td' colSpan={2} />
          <td className='checker-td' colSpan={3} />
          <td className='second-date-td' />
        </tr>
      )
    }
  }
}

TransferCardProcessTr.propTypes = {
  type: PropTypes.string,
  process: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onMove: PropTypes.func.isRequired
}

TransferCardProcessTr.defaultTypes = {
  type: 'barrel'
}

export default TransferCardProcessTr
