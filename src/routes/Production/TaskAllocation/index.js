import React from 'react'
import PropTypes from 'prop-types'
import { injectReducer } from 'store/reducers'
import { injectSagas } from 'store/sagas'
import container from 'bundle-loader?lazy!./containers/Container'
import Bundle from 'routes/bundle'

class GetComponent extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    const { store } = this.context
    Promise.all([import('./modules')]).then(([mod]) => {
      const reducer = mod.default
      const sagas = mod.sagas
      injectReducer(store, { key: 'taskAllocation', reducer })
      injectSagas(store, { key: 'taskAllocation', sagas })
    })
    return (
      <Bundle load={container}>
        {(Component) => {
          return <Component />
        }}
      </Bundle>
    )
  }
}

GetComponent.contextTypes = {
  store: PropTypes.object.isRequired
}

export default GetComponent