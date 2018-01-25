import { put, call, take } from 'redux-saga/effects'
import Immutable from 'immutable'
import fetchAPI from 'api'
import { apis } from 'api/config'

// ------------------------------------
// Constants
// ------------------------------------

const CALLFORBID_GET_BID_DATA = 'CALLFORBID_GET_BID_DATA'
const CALLFORBID_ADD_BID_DATA = 'CALLFORBID_ADD_BID_DATA'
const CALLFORBID_CHANGE_APPLY_SELECT_MODAL = 'CALLFORBID_CHANGE_APPLY_SELECT_MODAL'
const CALLFORBID_CHANGE_APPLY_WRITE_MODAL = 'CALLFORBID_CHANGE_APPLY_WRITE_MODAL'
const CALLFORBID_CHANGE_BID_MODAL = 'CALLFORBID_CHANGE_BID_MODAL'

// ------------------------------------
// Actions
// ------------------------------------

function getBidDataAction (payload = {}) {
  return {
    type    : CALLFORBID_GET_BID_DATA,
    payload : payload
  }
}

function addBidDataAction (payload = {}) {
  return {
    type    : CALLFORBID_ADD_BID_DATA,
    payload : payload
  }
}

function changeApplySelectModalAction (payload = {}) {
  return {
    type    : CALLFORBID_CHANGE_APPLY_SELECT_MODAL,
    payload : payload
  }
}

function changeApplyWriteModalAction (payload = {}) {
  return {
    type    : CALLFORBID_CHANGE_APPLY_WRITE_MODAL,
    payload : payload
  }
}

function changeBidModalAction (payload = {}) {
  return {
    type    : CALLFORBID_CHANGE_BID_MODAL,
    payload : payload
  }
}

export const actions = {
  getBidDataAction,
  changeApplySelectModalAction,
  changeApplyWriteModalAction,
  changeBidModalAction
}

// ------------------------------------
// Reducer
// ------------------------------------
var initialState = Immutable.fromJS({
  loading: false,
  pagination: {
    pageSize: 10
  },
  applySelectModal: {
    visible: false
  },
  applyWriteModal: {
    visible: false
  },
  bidModal: {
    visible: false
  }
})

export default function CallForBid (state = initialState, action) {
  var map = {
    CALLFORBID_ADD_BID_DATA () {
      const { data } = action.payload
      return state.merge({
        bid: data
      })
    },
    CALLFORBID_CHANGE_APPLY_SELECT_MODAL () {
      return state.mergeIn(['applySelectModal'], action.payload)
    },
    CALLFORBID_CHANGE_APPLY_WRITE_MODAL () {
      return state.mergeIn(['applyWriteModal'], action.payload)
    },
    CALLFORBID_CHANGE_BID_MODAL () {
      return state.mergeIn(['bidModal'], action.payload)
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
export function *getBidSaga (type, body) {
  while (true) {
    const { payload = {} } = yield take(CALLFORBID_GET_BID_DATA)
    const { params = {} } = payload
    const data = yield call(fetchAPI, apis.PurchaseAPI.getBiddingSheet, {}, { id: params.id })
    yield put(addBidDataAction({ data: data }))
  }
}

export const sagas = [
  getBidSaga
]
