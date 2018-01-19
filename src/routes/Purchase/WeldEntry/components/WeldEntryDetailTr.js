import React from 'react'
import PropTypes from 'prop-types'

import ItemOperationArea from './ItemOperationArea'

class WeldEntryDetailTr extends React.Component {
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
    const { item, index, onEdit } = this.props
    const { show } = this.state
    return (
      <tr
        className='detail-tr'
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <td className='name-td'>{item.name}</td>
        <td className='material-td'>{item.material}</td>
        <td className='model-td'>{item.model}</td>
        <td className='spec-td'>{item.spec}</td>
        <td className='total-weight-td'>{item.total_weight}</td>
        <td className='weight-td'>{item.weight}</td>
        <td className='count-td'>{item.count}</td>
        <td className='batch-number-td'>{item.batch_number}</td>
        <td className='material-number-td'>{item.material_number}</td>
        <td className='production-dt-td'>{item.production_dt && item.production_dt.split('T')[0]}</td>
        <td className='factory-td'>
          {item.factory}
          { show &&
            <ItemOperationArea
              index={index}
              onEdit={onEdit}
            />
          }
        </td>
      </tr>
    )
  }
}

WeldEntryDetailTr.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onEdit: PropTypes.func.isRequired
}

export default WeldEntryDetailTr
