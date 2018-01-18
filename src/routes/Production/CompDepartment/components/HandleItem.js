/**
 * Created by lh on 2018/1/18.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Button, Divider } from 'antd'

class HandleItem extends React.Component {
  constructor (props) {
    super(props)
  }
  handleRevoke = (e) => {
    const { handleRevoke } = this.props
    const { id, type } = e.target.dataset
    let values = {
      id: id,
      type: type
    }
    handleRevoke && handleRevoke({
      ...values
    })
  }
  handleConfirm = (e) => {
    const { handleConfirm } = this.props
    const { id, type } = e.target.dataset
    let values = {
      id: id,
      type: type
    }
    handleConfirm && handleConfirm({
      ...values
    })
  }
  render () {
    const { item, type } = this.props
    if (item[type]) {
      return (
        <span>
          <Button type='success' size='small'>已确认</Button>
          <Divider type='vertical' />
          <Button type='success' size='small' onClick={this.handleRevoke} data-id={item.id} data-type={type}>撤销</Button>
        </span>
      )
    } else {
      return (
        <Button onClick={this.handleConfirm} size='small' data-id={item.id} data-type={type}>确认</Button>
      )
    }
  }
}

HandleItem.propTypes = {
  item: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  handleRevoke: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func.isRequired
}

export default HandleItem
