import { put, call, take } from 'redux-saga/effects'
import Immutable from 'immutable'
import fetchAPI from 'api'
import { apis } from 'api/config'

// ------------------------------------
// Constants
// ------------------------------------

const WELDENTRY_GET_DATA = 'WELDENTRY_GET_DATA'
const WELDENTRY_ADD_DATA = 'WELDENTRY_ADD_DATA'
const WELDENTRY_CHANGE_MODAL = 'WELDENTRY_CHANGE_MODAL'

// ------------------------------------
// Actions
// ------------------------------------

function getDataAction (body) {
  return {
    type    : WELDENTRY_GET_DATA,
    payload : body
  }
}

function addDataAction (payload = {}) {
  return {
    type    : WELDENTRY_ADD_DATA,
    payload : payload
  }
}

function changeModalAction (payload = {}) {
  return {
    type    : WELDENTRY_CHANGE_MODAL,
    payload : payload
  }
}

export const actions = {
  getDataAction,
  addDataAction,
  changeModalAction
}

// ------------------------------------
// Reducer
// ------------------------------------
var initialState = Immutable.fromJS({
  loading: false,
  pagination: {
    pageSize: 10
  },
  modal: {
    visible: false
  }
})

export default function WeldEntry (state = initialState, action) {
  var map = {
    WELDENTRY_ADD_DATA () {
      let { data } = action.payload
      return state.merge({
        data
      })
    },
    WELDENTRY_CHANGE_MODAL () {
      return state.mergeIn(['modal'], action.payload)
    }
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

export function *getListSaga (type, body) {
  while (true) {
    const { payload = {} } = yield take(WELDENTRY_GET_DATA)
    const { callback, params = {}, id } = payload
    const data = yield call(fetchAPI, apis.PurchaseAPI.getWeldingMaterialEntry, params, { id })
    callback && callback(data)
    yield put(addDataAction({ data }))
  }
}

export const sagas = [
  getListSaga
]
