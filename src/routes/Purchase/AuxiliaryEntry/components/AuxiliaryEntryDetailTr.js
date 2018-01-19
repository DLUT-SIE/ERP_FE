import React from 'react'
import PropTypes from 'prop-types'

import ItemOperationArea from 'components/ItemOperationArea'

class AuxiliaryEntryDetailTr extends React.Component {
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
        <td className='spec-td'>{item.spec}</td>
        <td className='count-td'>{item.count}</td>
        <td className='factory-td'>{item.factory}</td>
        <td className='supplier-td'>{item.supplier}</td>
        <td className='unit-td'>{item.unit}</td>
        <td className='remark-td'>
          {item.remark}
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

AuxiliaryEntryDetailTr.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onEdit: PropTypes.func.isRequired
}

export default AuxiliaryEntryDetailTr
