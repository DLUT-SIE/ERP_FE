import { put, call, take } from 'redux-saga/effects'
import Immutable from 'immutable'
import fetchAPI from 'api'
import { apis } from 'api/config'

// ------------------------------------
// Constants
// ------------------------------------

const BROUTHTINENTRY_GET_DATA = 'BROUTHTINENTRY_GET_DATA'
const BROUTHTINENTRY_ADD_DATA = 'BROUTHTINENTRY_ADD_DATA'
const BROUTHTINENTRY_CHANGE_MODAL = 'BROUTHTINENTRY_CHANGE_MODAL'

// ------------------------------------
// Actions
// ------------------------------------

function getDataAction (body) {
  return {
    type    : BROUTHTINENTRY_GET_DATA,
    payload : body
  }
}

function addDataAction (payload = {}) {
  return {
    type    : BROUTHTINENTRY_ADD_DATA,
    payload : payload
  }
}

function changeModalAction (payload = {}) {
  return {
    type    : BROUTHTINENTRY_CHANGE_MODAL,
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

export default function BroughtInEntry (state = initialState, action) {
  var map = {
    BROUTHTINENTRY_ADD_DATA () {
      let { data } = action.payload
      return state.merge({
        data
      })
    },
    BROUTHTINENTRY_CHANGE_MODAL () {
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
    const { payload = {} } = yield take(BROUTHTINENTRY_GET_DATA)
    const { callback, params = {}, id } = payload
    const data = yield call(fetchAPI, apis.PurchaseAPI.getBoughtInComponentEntry, params, { id })
    callback && callback(data)
    yield put(addDataAction({ data }))
  }
}

export const sagas = [
  getListSaga
]
