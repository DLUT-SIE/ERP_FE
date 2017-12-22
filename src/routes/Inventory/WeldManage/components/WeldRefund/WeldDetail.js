import React from 'react'
import PropTypes from 'prop-types'

class WeldDetail extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    console.log('param', this.props.match)
    return (
      <div>WeldDetail</div>
    )
  }
}
WeldDetail.propTypes = {
  match: PropTypes.string
}
export default WeldDetail
