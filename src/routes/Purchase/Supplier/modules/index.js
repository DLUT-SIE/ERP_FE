import { put, call, take } from 'redux-saga/effects'
import Immutable from 'immutable'
import fetchAPI from 'api'
import { apis } from 'api/config'

// ------------------------------------
// Constants
// ------------------------------------

const SUPPLIER_GET_LIST_DATA = 'SUPPLIER_GET_LIST_DATA'
const SUPPLIER_ADD_LIST_DATA = 'SUPPLIER_ADD_LIST_DATA'
const SUPPLIER_CHANGE_SUPPLIER_MODAL = 'SUPPLIER_CHANGE_SUPPLIER_MODAL'
const PAGE_SIZE = 10

// ------------------------------------
// Actions
// ------------------------------------

function getListDataAction (body) {
  return {
    type    : SUPPLIER_GET_LIST_DATA,
    payload : body
  }
}

function addListDataAction (payload = {}) {
  return {
    type    : SUPPLIER_ADD_LIST_DATA,
    payload : payload
  }
}

function changeSupplierModalAction (payload = {}) {
  return {
    type    : SUPPLIER_CHANGE_SUPPLIER_MODAL,
    payload : payload
  }
}

export const actions = {
  getListDataAction,
  addListDataAction,
  changeSupplierModalAction
}

// ------------------------------------
// Reducer
// ------------------------------------
var initialState = Immutable.fromJS({
  loading: false,
  pagination: {
    pageSize: 10
  },
  supplierModal: {
    visible: false
  }
})

export default function Supplier (state = initialState, action) {
  var map = {
    SUPPLIER_GET_LIST_DATA () {
      let { params = {} } = action.payload
      return state.mergeIn(
        ['pagination'], {
          current: +(params.page || 1),
          pageSize: +(params.limit || PAGE_SIZE)
        }
      ).set(
        'loading', true
      )
    },
    SUPPLIER_ADD_LIST_DATA () {
      let { data } = action.payload
      return state.mergeIn(
        ['pagination'], { total: data.count }
      ).merge({
        loading: false,
        list: data.results
      })
    },
    SUPPLIER_CHANGE_SUPPLIER_MODAL () {
      return state.mergeIn(['supplierModal'], action.payload)
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
    const { payload = {} } = yield take(SUPPLIER_GET_LIST_DATA)
    const { callback, params } = payload
    const data = yield call(fetchAPI, apis.PurchaseAPI.getSuppliers, params)
    callback && callback(data)
    yield put(addListDataAction({ data: data }))
  }
}

export const sagas = [
  getListSaga
]
