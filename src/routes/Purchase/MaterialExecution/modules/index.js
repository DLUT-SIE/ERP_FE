import { put, call, take } from 'redux-saga/effects'
import Immutable from 'immutable'
import fetchAPI from 'api'
import { apis } from 'api/config'

// ------------------------------------
// Constants
// ------------------------------------

const MATERIALEXECUTION_GET_LIST_DATA = 'MATERIALEXECUTION_GET_LIST_DATA'
const MATERIALEXECUTION_ADD_LIST_DATA = 'MATERIALEXECUTION_ADD_LIST_DATA'
const MATERIALEXECUTION_CHANGE_MODAL = 'MATERIALEXECUTION_CHANGE_MODAL'
const PAGE_SIZE = 10

// ------------------------------------
// Actions
// ------------------------------------

function getListDataAction (body) {
  return {
    type    : MATERIALEXECUTION_GET_LIST_DATA,
    payload : body
  }
}

function addListDataAction (payload = {}) {
  return {
    type    : MATERIALEXECUTION_ADD_LIST_DATA,
    payload : payload
  }
}

function changeModalAction (payload = {}) {
  return {
    type    : MATERIALEXECUTION_CHANGE_MODAL,
    payload : payload
  }
}

export const actions = {
  getListDataAction,
  addListDataAction,
  changeModalAction
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

export default function MaterialExecution (state = initialState, action) {
  var map = {
    MATERIALEXECUTION_GET_LIST_DATA () {
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
    MATERIALEXECUTION_ADD_LIST_DATA () {
      let { data } = action.payload
      return state.mergeIn(
        ['pagination'], { total: data.count }
      ).merge({
        loading: false,
        list: data.results
      })
    },
    MATERIALEXECUTION_CHANGE_MODAL () {
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
    const { payload = {} } = yield take(MATERIALEXECUTION_GET_LIST_DATA)
    const { callback, params } = payload
    const data = yield call(fetchAPI, apis.PurchaseAPI.getBiddingSheets, params)
    callback && callback(data)
    yield put(addListDataAction({ data: data }))
  }
}

export const sagas = [
  getListSaga
]
