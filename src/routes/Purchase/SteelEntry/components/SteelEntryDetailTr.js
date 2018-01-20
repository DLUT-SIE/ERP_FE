import React from 'react'
import PropTypes from 'prop-types'

import ItemOperationArea from 'components/ItemOperationArea'

class SteelEntryDetailTr extends React.Component {
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
    const { item, isBar, index, onEdit } = this.props
    const { show } = this.state
    return (
      <tr
        className='detail-tr'
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <td className='order-td'>{item.order}</td>
        <td className='work-order-uid-td'>{item.work_order_uid}</td>
        <td className='figure-number-td'>{item.figure_number}</td>
        <td className='name-spec-td'>{item.name} {item.spec}</td>
        <td className='material-number-td'>{item.material_number}</td>
        <td className='batch-number-td'>{item.batch_number}</td>
        <td className='sign-td'>{item.sign}</td>
        <td className='unit-td'>{item.unit}</td>
        <td className='count-td'>{item.count}</td>
        { isBar &&
          <td className='length-td'>
            {item.length}
          </td>
        }
        <td className='weight-td'>
          {item.weight}
          { show &&
            <ItemOperationArea
              item={item}
              index={index}
              onEdit={onEdit}
            />
          }
        </td>
      </tr>
    )
  }
}

SteelEntryDetailTr.propTypes = {
  item: PropTypes.object.isRequired,
  isBar: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  onEdit: PropTypes.func.isRequired
}

export default SteelEntryDetailTr
