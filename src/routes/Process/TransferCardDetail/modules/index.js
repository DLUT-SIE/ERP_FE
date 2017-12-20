// import { put, call, take } from 'redux-saga/effects'
import Immutable from 'immutable'
// import fetchAPI from 'api'
// import { apis } from 'api/config'

// ------------------------------------
// Constants
// ------------------------------------

// ------------------------------------
// Actions
// ------------------------------------

export const actions = {}

// ------------------------------------
// Reducer
// ------------------------------------
var initialState = Immutable.fromJS({

})

export default function TransferCard (state = initialState, action) {
  var map = {
  }

  if (map[action.type]) {
    return map[action.type]()
  } else {
    return state
  }
}

// ------------------------------------
// Sagas
// ------------------------------------

export const sagas = [
]
