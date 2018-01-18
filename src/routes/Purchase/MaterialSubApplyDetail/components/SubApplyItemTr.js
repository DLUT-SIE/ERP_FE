import React from 'react'
import PropTypes from 'prop-types'

import ItemOperationArea from './ItemOperationArea'

class SubApplyItemTr extends React.Component {
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

  render () {
    const { item, index, onEdit, onDelete } = this.props
    const { show } = this.state
    return (
      <tr
        className='item-value-tr'
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <td className='part-figure-code-td' colSpan={2}>
          {item.part_figure_code}
        </td>
        <td className='part-ticket-code-td' colSpan={3}>
          {item.part_ticket_code}
        </td>
        <td className='old-name-td' colSpan={3}>
          {item.old_name}
        </td>
        <td className='old-standard-td'>
          {item.old_standard}
        </td>
        <td className='old-size-td' colSpan={3}>
          {item.old_size}
        </td>
        <td className='new-name-td' colSpan={2}>
          {item.new_name}
        </td>
        <td className='new-standard-td' colSpan={2}>
          {item.new_standard}
        </td>
        <td className='new-size-td'>
          {item.new_size}
          { show &&
            <ItemOperationArea
              id={item.id}
              index={index}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          }
        </td>
      </tr>
    )
  }
}

SubApplyItemTr.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default SubApplyItemTr
