import { put, call, take } from 'redux-saga/effects'
import Immutable from 'immutable'
import fetchAPI from 'api'
import { apis } from 'api/config'

// ------------------------------------
// Constants
// ------------------------------------

const PURCHASEORDER_GET_PURCHASE_ORDER = 'PURCHASEORDER_GET_PURCHASE_ORDER'
const PURCHASEORDER_ADD_PURCHASE_ORDER = 'PURCHASEORDER_ADD_PURCHASE_ORDER'
const PURCHASEORDER_GET_LIST_DATA = 'PURCHASEORDER_GET_LIST_DATA'
const PURCHASEORDER_ADD_LIST_DATA = 'PURCHASEORDER_ADD_LIST_DATA'
const PURCHASEORDER_CHANGE_EDIT_MODAL = 'PURCHASEORDER_CHANGE_EDIT_MODAL'
const PAGE_SIZE = 10

// ------------------------------------
// Actions
// ------------------------------------

function getPurchaseOrderAction (body) {
  return {
    type    : PURCHASEORDER_GET_PURCHASE_ORDER,
    payload : body
  }
}

function addPurchaseOrderAction (payload = {}) {
  return {
    type    : PURCHASEORDER_ADD_PURCHASE_ORDER,
    payload : payload
  }
}

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

function changeEditModalAction (payload = {}) {
  return {
    type    : PURCHASEORDER_CHANGE_EDIT_MODAL,
    payload : payload
  }
}

export const actions = {
  getPurchaseOrderAction,
  getListDataAction,
  addListDataAction,
  changeEditModalAction
}

// ------------------------------------
// Reducer
// ------------------------------------
var initialState = Immutable.fromJS({
  loading: false,
  pagination: {
    pageSize: 10
  },
  purchaseOrderInfo: {},
  editModal: {
    visible: false
  }
})

export default function PurchaseOrder (state = initialState, action) {
  var map = {
    PURCHASEORDER_ADD_PURCHASE_ORDER () {
      const { data } = action.payload
      return state.merge({
        purchaseOrderInfo: data
      })
    },
    PURCHASEORDER_GET_LIST_DATA () {
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
    PURCHASEORDER_ADD_LIST_DATA () {
      let { data } = action.payload
      return state.mergeIn(
        ['pagination'], { total: data.total }
      ).merge({
        loading: false,
        list: data.results
      })
    },
    PURCHASEORDER_CHANGE_EDIT_MODAL () {
      return state.mergeIn(['editModal'], action.payload)
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
    const data = yield call(fetchAPI, apis.PurchaseAPI.getProcurementMaterials, params)
    callback && callback(data)
    yield put(addListDataAction({ data }))
  }
}

export function *getPurchaseOrderSaga (type, body) {
  while (true) {
    const { payload = {} } = yield take(PURCHASEORDER_GET_PURCHASE_ORDER)
    const { callback, params } = payload
    let { url, method } = apis.PurchaseAPI.getPurchaseOrder
    const api = {
      url: url(params.id),
      method
    }
    const data = yield call(fetchAPI, api)
    callback && callback(data)
    yield put(addPurchaseOrderAction({ data }))
  }
}

export const sagas = [
  getListSaga,
  getPurchaseOrderSaga
]
