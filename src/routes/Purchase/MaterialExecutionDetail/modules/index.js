import { put, call, take } from 'redux-saga/effects'
import Immutable from 'immutable'
import fetchAPI from 'api'
import { apis } from 'api/config'

// ------------------------------------
// Constants
// ------------------------------------

const MATERIALEXECUTIONDETAIL_GET_EXECUTION_DATA = 'MATERIALEXECUTIONDETAIL_GET_EXECUTION_DATA'
const MATERIALEXECUTIONDETAIL_ADD_EXECUTION_DATA = 'MATERIALEXECUTIONDETAIL_ADD_EXECUTION_DATA'
const MATERIALEXECUTIONDETAIL_GET_LIST_DATA = 'MATERIALEXECUTIONDETAIL_GET_LIST_DATA'
const MATERIALEXECUTIONDETAIL_ADD_LIST_DATA = 'MATERIALEXECUTIONDETAIL_ADD_LIST_DATA'
const MATERIALEXECUTIONDETAIL_CHANGE_LIST_DATA = 'MATERIALEXECUTIONDETAIL_CHANGE_LIST_DATA'
const MATERIALEXECUTIONDETAIL_GET_DETAIL_LIST_DATA = 'MATERIALEXECUTIONDETAIL_GET_DETAIL_LIST_DATA'
const MATERIALEXECUTIONDETAIL_ADD_DETAIL_LIST_DATA = 'MATERIALEXECUTIONDETAIL_ADD_DETAIL_LIST_DATA'
const MATERIALEXECUTIONDETAIL_CHANGE_DETAIL_MODAL = 'MATERIALEXECUTIONDETAIL_CHANGE_DETAIL_MODAL'
const MATERIALEXECUTIONDETAIL_CHANGE_EDIT_MODAL = 'MATERIALEXECUTIONDETAIL_CHANGE_EDIT_MODAL'
const MATERIALEXECUTIONDETAIL_CHANGE_EXECUTION_DATA = 'MATERIALEXECUTIONDETAIL_CHANGE_EXECUTION_DATA'
const MATERIALEXECUTIONDETAIL_RESET_DATA = 'MATERIALEXECUTIONDETAIL_RESET_DATA'

// ------------------------------------
// Actions
// ------------------------------------

function getExecutionDataAction (body) {
  return {
    type    : MATERIALEXECUTIONDETAIL_GET_EXECUTION_DATA,
    payload : body
  }
}

function addExecutionDataAction (payload = {}) {
  return {
    type    : MATERIALEXECUTIONDETAIL_ADD_EXECUTION_DATA,
    payload : payload
  }
}

function getListDataAction (body) {
  return {
    type    : MATERIALEXECUTIONDETAIL_GET_LIST_DATA,
    payload : body
  }
}

function addListDataAction (payload = {}) {
  return {
    type    : MATERIALEXECUTIONDETAIL_ADD_LIST_DATA,
    payload : payload
  }
}

function changeListDataAction (payload = {}) {
  return {
    type    : MATERIALEXECUTIONDETAIL_CHANGE_LIST_DATA,
    payload : payload
  }
}

function getDetailListDataAction (body) {
  return {
    type    : MATERIALEXECUTIONDETAIL_GET_DETAIL_LIST_DATA,
    payload : body
  }
}

function addDetailListDataAction (payload = {}) {
  return {
    type    : MATERIALEXECUTIONDETAIL_ADD_DETAIL_LIST_DATA,
    payload : payload
  }
}

function changeDetailModalAction (payload = {}) {
  return {
    type    : MATERIALEXECUTIONDETAIL_CHANGE_DETAIL_MODAL,
    payload : payload
  }
}

function changeEditModalAction (payload = {}) {
  return {
    type    : MATERIALEXECUTIONDETAIL_CHANGE_EDIT_MODAL,
    payload : payload
  }
}

function changeExecutionDataAction (payload = {}) {
  return {
    type    : MATERIALEXECUTIONDETAIL_CHANGE_EXECUTION_DATA,
    payload : payload
  }
}

function resetDataAction (payload = {}) {
  return {
    type    : MATERIALEXECUTIONDETAIL_RESET_DATA,
    payload : payload
  }
}

export const actions = {
  getExecutionDataAction,
  getListDataAction,
  addListDataAction,
  changeListDataAction,
  getDetailListDataAction,
  changeDetailModalAction,
  changeEditModalAction,
  changeExecutionDataAction,
  resetDataAction
}

// ------------------------------------
// Reducer
// ------------------------------------
var initialState = Immutable.fromJS({
  loading: false,
  pagination: {
    pageSize: 10
  },
  detailModal: {
    visible: false
  },
  editModal: {
    visible: false
  },
  execution: {}
})

export default function MaterialExecutionDetail (state = initialState, action) {
  var map = {
    MATERIALEXECUTIONDETAIL_ADD_EXECUTION_DATA () {
      let { data } = action.payload
      return state.merge({
        execution: data
      })
    },
    MATERIALEXECUTIONDETAIL_GET_LIST_DATA () {
      return state.set(
        'loading', true
      )
    },
    MATERIALEXECUTIONDETAIL_ADD_LIST_DATA () {
      let { data } = action.payload
      return state.merge({
        loading: false,
        list: data.results
      })
    },
    MATERIALEXECUTIONDETAIL_CHANGE_LIST_DATA () {
      let { list, detailList } = action.payload
      return state.merge({
        list,
        detailList
      })
    },
    MATERIALEXECUTIONDETAIL_ADD_DETAIL_LIST_DATA () {
      let { data } = action.payload
      return state.merge({
        detailList: data.results
      })
    },
    MATERIALEXECUTIONDETAIL_CHANGE_DETAIL_MODAL () {
      return state.mergeIn(['detailModal'], action.payload)
    },
    MATERIALEXECUTIONDETAIL_CHANGE_EDIT_MODAL () {
      return state.mergeIn(['editModal'], action.payload)
    },
    MATERIALEXECUTIONDETAIL_CHANGE_EXECUTION_DATA () {
      return state.mergeIn(['execution'], action.payload)
    },
    MATERIALEXECUTIONDETAIL_RESET_DATA () {
      return state.merge({
        execution: {},
        list: []
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

export function *getExecutionSaga (type, body) {
  while (true) {
    const { payload = {} } = yield take(MATERIALEXECUTIONDETAIL_GET_EXECUTION_DATA)
    const { callback, params = {}, id } = payload
    const data = yield call(fetchAPI, apis.PurchaseAPI.getMaterialExecution, params, { id })
    callback && callback(data)
    yield put(addExecutionDataAction({ data }))
  }
}

export function *getListSaga (type, body) {
  while (true) {
    const { payload = {} } = yield take(MATERIALEXECUTIONDETAIL_GET_LIST_DATA)
    const { callback, params } = payload
    const data = yield call(fetchAPI, apis.PurchaseAPI.getMaterialExecutionDetails, params)
    callback && callback(data)
    yield put(addListDataAction({ data }))
  }
}

export function *getDetailSaga (type, body) {
  while (true) {
    const { payload = {} } = yield take(MATERIALEXECUTIONDETAIL_GET_DETAIL_LIST_DATA)
    const { callback, params = {} } = payload
    const data = yield call(fetchAPI, apis.PurchaseAPI.getProcurementMaterials, params)
    callback && callback(data)
    yield put(addDetailListDataAction({ data }))
  }
}

export const sagas = [
  getExecutionSaga,
  getListSaga,
  getDetailSaga
]
