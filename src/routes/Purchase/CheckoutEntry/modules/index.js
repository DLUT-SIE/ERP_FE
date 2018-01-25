import { put, call, take } from 'redux-saga/effects'
import Immutable from 'immutable'
import _ from 'lodash'
import fetchAPI from 'api'
import { apis } from 'api/config'

// ------------------------------------
// Constants
// ------------------------------------

const CHECKOUTENTRY_GET_LIST_DATA = 'CHECKOUTENTRY_GET_LIST_DATA'
const CHECKOUTENTRY_ADD_LIST_DATA = 'CHECKOUTENTRY_ADD_LIST_DATA'
const CHECKOUTENTRY_GET_BID_DATA = 'CHECKOUTENTRY_GET_BID_DATA'
const CHECKOUTENTRY_ADD_BID_DATA = 'CHECKOUTENTRY_ADD_BID_DATA'
const CHECKOUTENTRY_GET_ORDER_DATA = 'CHECKOUTENTRY_GET_ORDER_DATA'
const CHECKOUTENTRY_ADD_ORDER_DATA = 'CHECKOUTENTRY_ADD_ORDER_DATA'
const PAGE_SIZE = 10

// ------------------------------------
// Actions
// ------------------------------------

function getListDataAction (body) {
  return {
    type    : CHECKOUTENTRY_GET_LIST_DATA,
    payload : body
  }
}

function addListDataAction (payload = {}) {
  return {
    type    : CHECKOUTENTRY_ADD_LIST_DATA,
    payload : payload
  }
}

function getBidDataAction (body) {
  return {
    type    : CHECKOUTENTRY_GET_BID_DATA,
    payload : body
  }
}

function addBidDataAction (payload = {}) {
  return {
    type    : CHECKOUTENTRY_ADD_BID_DATA,
    payload : payload
  }
}

function getOrderDataAction (body) {
  return {
    type    : CHECKOUTENTRY_GET_ORDER_DATA,
    payload : body
  }
}

function addOrderDataAction (payload = {}) {
  return {
    type    : CHECKOUTENTRY_ADD_ORDER_DATA,
    payload : payload
  }
}

export const actions = {
  getListDataAction,
  addListDataAction,
  getBidDataAction,
  getOrderDataAction,
  addOrderDataAction
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

export default function CheckoutEntry (state = initialState, action) {
  var map = {
    CHECKOUTENTRY_GET_LIST_DATA () {
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
    CHECKOUTENTRY_ADD_LIST_DATA () {
      let { data } = action.payload
      return state.mergeIn(
        ['pagination'], { total: data.count }
      ).merge({
        list: data.results,
        loading: false
      })
    },
    CHECKOUTENTRY_ADD_BID_DATA () {
      const { data } = action.payload
      return state.merge({
        bid: data
      })
    },
    CHECKOUTENTRY_ADD_ORDER_DATA () {
      const { data, columns } = action.payload
      const params = {
        data
      }
      if (!_.isUndefined(columns)) {
        params.columns = columns
      }
      return state.merge(params)
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
    const { payload = {} } = yield take(CHECKOUTENTRY_GET_LIST_DATA)
    const { callback, params } = payload
    const data = yield call(fetchAPI, apis.PurchaseAPI.getArrivalInspections, params)
    callback && callback(data)
    yield put(addListDataAction({ data }))
  }
}

export function *getBidSaga (type, body) {
  while (true) {
    const { payload = {} } = yield take(CHECKOUTENTRY_GET_BID_DATA)
    const { callback, id } = payload
    const data = yield call(fetchAPI, apis.PurchaseAPI.getBiddingSheet, {}, { id })
    callback && callback(data)
    yield put(addBidDataAction({ data }))
  }
}

export function *getOrderSaga (type, body) {
  while (true) {
    const { payload = {} } = yield take(CHECKOUTENTRY_GET_ORDER_DATA)
    const { callback, id } = payload
    const data = yield call(fetchAPI, apis.PurchaseAPI.getPurchaseOrder, {}, { id })
    callback && callback(data)
    yield put(addOrderDataAction({ data }))
  }
}

export const sagas = [
  getListSaga,
  getBidSaga,
  getOrderSaga
]
