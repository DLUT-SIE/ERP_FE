import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Router } from 'react-router'
import createBrowserHistory from 'history/createBrowserHistory'
import { Provider } from 'react-redux'
import Routes from 'routes/index.js'

const history = createBrowserHistory()

class AppContainer extends Component {
  static propTypes = {
    store  : PropTypes.object.isRequired
  }

  shouldComponentUpdate () {
    return false
  }

  render () {
    const { store } = this.props

    return (
      <Provider store={store}>
        <Router history={history}>
          <Routes store={store} />
        </Router>
      </Provider>
    )
  }
}

export default AppContainer
