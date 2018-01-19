import { put, call, take } from 'redux-saga/effects'
import Immutable from 'immutable'
import fetchAPI from 'api'
import { apis } from 'api/config'

// ------------------------------------
// Constants
// ------------------------------------

const AUXILIARYENTRY_GET_DATA = 'AUXILIARYENTRY_GET_DATA'
const AUXILIARYENTRY_ADD_DATA = 'AUXILIARYENTRY_ADD_DATA'
const AUXILIARYENTRY_CHANGE_MODAL = 'AUXILIARYENTRY_CHANGE_MODAL'

// ------------------------------------
// Actions
// ------------------------------------

function getDataAction (body) {
  return {
    type    : AUXILIARYENTRY_GET_DATA,
    payload : body
  }
}

function addDataAction (payload = {}) {
  return {
    type    : AUXILIARYENTRY_ADD_DATA,
    payload : payload
  }
}

function changeModalAction (payload = {}) {
  return {
    type    : AUXILIARYENTRY_CHANGE_MODAL,
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

export default function AuxiliaryEntry (state = initialState, action) {
  var map = {
    AUXILIARYENTRY_ADD_DATA () {
      let { data } = action.payload
      return state.merge({
        data
      })
    },
    AUXILIARYENTRY_CHANGE_MODAL () {
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
    const { payload = {} } = yield take(AUXILIARYENTRY_GET_DATA)
    const { callback, params = {}, id } = payload
    const data = yield call(fetchAPI, apis.PurchaseAPI.getAuxiliaryMaterialEntry, params, { id })
    callback && callback(data)
    yield put(addDataAction({ data }))
  }
}

export const sagas = [
  getListSaga
]
