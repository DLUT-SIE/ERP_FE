import React from 'react'
import PropTypes from 'prop-types'
import { injectReducer } from 'store/reducers'
import { injectSagas } from 'store/sagas'
import container from 'bundle-loader?lazy!./containers/Container'
import modules from 'bundle-loader?lazy!./modules'
import Bundle from 'routes/bundle'

class GetComponent extends React.Component {
  render () {
    const { store } = this.context
    return (
      <Bundle load={modules}>
        {(mod) => {
          const reducer = mod.default
          const sagas = mod.sagas
          injectReducer(store, { key: 'weldingSeam', reducer })
          injectSagas(store, { key: 'weldingSeam', sagas })
          return (
            <Bundle load={container}>
              {(Component) => {
                return <Component.default />
              }}
            </Bundle>
          )
        }}
      </Bundle>
    )
  }
}

GetComponent.contextTypes = {
  store: PropTypes.object.isRequired
}

export default GetComponent
