import { put, call, take } from 'redux-saga/effects'
import Immutable from 'immutable'
import fetchAPI from 'api'
import { apis } from 'api/config'

// ------------------------------------
// Constants
// ------------------------------------

const CONTRACT_GET_LIST_DATA = 'CONTRACT_GET_LIST_DATA'
const CONTRACT_ADD_LIST_DATA = 'CONTRACT_ADD_LIST_DATA'
const CONTRACT_CHANGE_AMOUNT_MODAL = 'CONTRACT_CHANGE_AMOUNT_MODAL'
const PAGE_SIZE = 10

// ------------------------------------
// Actions
// ------------------------------------

function getListDataAction (body) {
  return {
    type    : CONTRACT_GET_LIST_DATA,
    payload : body
  }
}

function addListDataAction (payload = {}) {
  return {
    type    : CONTRACT_ADD_LIST_DATA,
    payload : payload
  }
}

function changeAmountModalAction (payload = {}) {
  return {
    type    : CONTRACT_CHANGE_AMOUNT_MODAL,
    payload : payload
  }
}

export const actions = {
  getListDataAction,
  addListDataAction,
  changeAmountModalAction
}

// ------------------------------------
// Reducer
// ------------------------------------
var initialState = Immutable.fromJS({
  loading: false,
  pagination: {
    pageSize: 10
  },
  amountModal: {
    visible: false
  }
})

export default function Contract (state = initialState, action) {
  var map = {
    CONTRACT_GET_LIST_DATA () {
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
    CONTRACT_ADD_LIST_DATA () {
      let { data } = action.payload
      return state.mergeIn(
        ['pagination'], { total: data.count }
      ).merge({
        loading: false,
        list: data.results
      })
    },
    CONTRACT_CHANGE_AMOUNT_MODAL () {
      return state.mergeIn(['amountModal'], action.payload)
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
    const { payload = {} } = yield take(CONTRACT_GET_LIST_DATA)
    const { callback, params } = payload
    const data = yield call(fetchAPI, apis.PurchaseAPI.getContracts, params)
    callback && callback(data)
    yield put(addListDataAction({ data: data }))
  }
}

export const sagas = [
  getListSaga
]
