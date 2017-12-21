import { put, call, take } from 'redux-saga/effects'
import Immutable from 'immutable'
import fetchAPI from 'api'
import { apis } from 'api/config'

// ------------------------------------
// Constants
// ------------------------------------

const PURCHASEORDER_GET_LIST_DATA = 'PURCHASEORDER_GET_LIST_DATA'
const PURCHASEORDER_ADD_LIST_DATA = 'PURCHASEORDER_ADD_LIST_DATA'

// ------------------------------------
// Actions
// ------------------------------------

function getListDataAction (body) {
  return {
    type    : PURCHASEORDER_GET_LIST_DATA,
    payload : body
  }
}

function addListDataAction (payload = {}) {
  return {
    type    : PURCHASEORDER_ADD_LIST_DATA,
    payload : payload
  }
}

export const actions = {
  getListDataAction,
  addListDataAction
}

// ------------------------------------
// Reducer
// ------------------------------------
var initialState = Immutable.fromJS({
  loading: false,
  pagination: {
    pageSize: 10
  }
})

export default function PurchaseOrder (state = initialState, action) {
  var map = {
    PURCHASEORDER_GET_LIST_DATA () {
      return state.set(
        'loading', true
      )
    },
    PURCHASEORDER_ADD_LIST_DATA () {
      let { data } = action.payload
      const { results } = data
      return state.merge({
        list: results,
        loading: false
      })
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
    const { payload = {} } = yield take(PURCHASEORDER_GET_LIST_DATA)
    const { callback, params } = payload
    const [ data ] = yield [
      call(fetchAPI, apis.PurchaseAPI.getPurchaseOrders, params)
    ]
    callback && callback(data.results)
    yield put(addListDataAction({ data }))
  }
}

export const sagas = [
  getListSaga
]
