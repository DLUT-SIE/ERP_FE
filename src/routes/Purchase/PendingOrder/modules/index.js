import { put, call, take } from 'redux-saga/effects'
import Immutable from 'immutable'
import fetchAPI from 'api'
import { apis } from 'api/config'

// ------------------------------------
// Constants
// ------------------------------------

const PENDING_GET_INIT_DATA = 'PENDING_GET_INIT_DATA'
const PENDING_ADD_INIT_DATA = 'PENDING_ADD_INIT_DATA'
const PENDING_GET_LIST_DATA = 'PENDING_GET_LIST_DATA'
const PENDING_ADD_LIST_DATA = 'PENDING_ADD_LIST_DATA'
const PAGE_SIZE = 10

// ------------------------------------
// Actions
// ------------------------------------

function getInitDataAction (body) {
  return {
    type    : PENDING_GET_INIT_DATA,
    payload : body
  }
}

function addInitDataAction (payload = {}) {
  return {
    type    : PENDING_ADD_INIT_DATA,
    payload : payload
  }
}

function getListDataAction (body) {
  return {
    type    : PENDING_GET_LIST_DATA,
    payload : body
  }
}

function addListDataAction (payload = {}) {
  return {
    type    : PENDING_ADD_LIST_DATA,
    payload : payload
  }
}

export const actions = {
  getInitDataAction,
  addInitDataAction,
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

export default function PendingOrder (state = initialState, action) {
  var map = {
    PENDING_GET_INIT_DATA () {
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
    PENDING_ADD_INIT_DATA () {
      let { list } = action.payload
      return state.mergeIn(
        ['pagination'], { total: list.total }
      ).merge({
        loading: false,
        ...action.payload
      })
    },
    PENDING_GET_LIST_DATA () {
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
    PENDING_ADD_LIST_DATA () {
      let { list } = action.payload
      return state.mergeIn(
        ['pagination'], { total: list.total }
      ).merge({
        list: list,
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
export function *getInitSaga (type, body) {
  while (true) {
    const { payload = {} } = yield take(PENDING_GET_INIT_DATA)
    const { callback, params } = payload
    const [ list ] = yield [
      call(fetchAPI, apis.getPendingOrderList, params)
    ]
    callback && callback(list.data)
    yield put(addInitDataAction({ list: list.data }))
  }
}

export function *getListSaga (type, body) {
  while (true) {
    const { payload = {} } = yield take(PENDING_GET_LIST_DATA)
    const { callback, params } = payload
    const [ list ] = yield [
      call(fetchAPI, apis.getPendingOrderList, params)
    ]
    callback && callback(list.order_id)
    yield put(addListDataAction({ list: list.order_id }))
  }
}

export const sagas = [
  getInitSaga,
  getListSaga
]
