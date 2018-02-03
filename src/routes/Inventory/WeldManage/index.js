import React from 'react'
import container from 'bundle-loader?lazy!./components/MenuPanel'
import Bundle from 'routes/bundle'

class GetComponent extends React.Component {
  render () {
    return (
      <Bundle load={container}>
        {(Component) => {
          return <Component.default />
        }}
      </Bundle>
    )
  }
}

export default GetComponent
