import { put, call, take } from 'redux-saga/effects'
import Immutable from 'immutable'
import fetchAPI from 'api'
import { apis } from 'api/config'

// ------------------------------------
// Constants
// ------------------------------------

const SUPPLIERSELECT_GET_LIST_DATA = 'SUPPLIERSELECT_GET_LIST_DATA'
const SUPPLIERSELECT_ADD_LIST_DATA = 'SUPPLIERSELECT_ADD_LIST_DATA'
const SUPPLIERSELECT_CHANGE_QUOTATION_MODAL = 'SUPPLIERSELECT_CHANGE_QUOTATION_MODAL'
const PAGE_SIZE = 10

// ------------------------------------
// Actions
// ------------------------------------

function getListDataAction (body) {
  return {
    type    : SUPPLIERSELECT_GET_LIST_DATA,
    payload : body
  }
}

function addListDataAction (payload = {}) {
  return {
    type    : SUPPLIERSELECT_ADD_LIST_DATA,
    payload : payload
  }
}

function changeQuotationModalAction (payload = {}) {
  return {
    type    : SUPPLIERSELECT_CHANGE_QUOTATION_MODAL,
    payload : payload
  }
}

export const actions = {
  getListDataAction,
  addListDataAction,
  changeQuotationModalAction
}

// ------------------------------------
// Reducer
// ------------------------------------
var initialState = Immutable.fromJS({
  loading: false,
  pagination: {
    pageSize: 10
  },
  quotationModal: {
    visible: false
  }
})

export default function SupplierSelect (state = initialState, action) {
  var map = {
    SUPPLIERSELECT_GET_LIST_DATA () {
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
    SUPPLIERSELECT_ADD_LIST_DATA () {
      let { data } = action.payload
      return state.mergeIn(
        ['pagination'], { total: data.count }
      ).merge({
        list: data.results,
        loading: false
      })
    },
    SUPPLIERSELECT_CHANGE_QUOTATION_MODAL () {
      return state.mergeIn(['quotationModal'], action.payload)
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
    const { payload = {} } = yield take(SUPPLIERSELECT_GET_LIST_DATA)
    const { callback, params } = payload
    const data = yield call(fetchAPI, apis.PurchaseAPI.getSuppliersWithBiddingSheet, params)
    callback && callback(data)
    yield put(addListDataAction({ data }))
  }
}

export const sagas = [
  getListSaga
]
