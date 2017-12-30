import { put, call, take } from 'redux-saga/effects'
import Immutable from 'immutable'
import fetchAPI from 'api'
import { apis } from 'api/config'

// ------------------------------------
// Constants
// ------------------------------------

const AUXILIARY_GET_LIST_DATA = 'AUXILIARY_GET_LIST_DATA'
const AUXILIARY_ADD_LIST_DATA = 'AUXILIARY_ADD_LIST_DATA'
const AUXILIARY_GET_LIBRARY_DATA = 'AUXILIARY_GET_LIBRARY_DATA'
const AUXILIARY_ADD_LIBRARY_DATA = 'AUXILIARY_ADD_LIBRARY_DATA'
const AUXILIARY_RESET_DATA = 'AUXILIARY_RESET_DATA'
const AUXILIARY_CHANGE_MODAL_DATA = 'AUXILIARY_CHANGE_MODAL_DATA'
const PAGE_SIZE = 10

// ------------------------------------
// Actions
// ------------------------------------

function getListDataAction (body) {
  return {
    type    : AUXILIARY_GET_LIST_DATA,
    payload : body
  }
}

function addListDataAction (payload = {}) {
  return {
    type    : AUXILIARY_ADD_LIST_DATA,
    payload : payload
  }
}

function getLibraryDataAction (body) {
  return {
    type    : AUXILIARY_GET_LIBRARY_DATA,
    payload : body
  }
}

function addLibraryDataAction (payload = {}) {
  return {
    type    : AUXILIARY_ADD_LIBRARY_DATA,
    payload : payload
  }
}

function resetDataAction (payload = {}) {
  return {
    type    : AUXILIARY_RESET_DATA,
    payload : payload
  }
}

function changeModalAction (payload = {}) {
  return {
    type    : AUXILIARY_CHANGE_MODAL_DATA,
    payload : payload
  }
}

export const actions = {
  getListDataAction,
  getLibraryDataAction,
  resetDataAction,
  changeModalAction
}

// ------------------------------------
// Reducer
// ------------------------------------
var initialState = Immutable.fromJS({
  loading: false,
  pagination: {
    pageSize: 10
  },
  modal: {
    visible: false
  },
  workOrderInfo: {}
})

export default function AuxiliaryQuota (state = initialState, action) {
  var map = {
    AUXILIARY_GET_LIST_DATA () {
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
    AUXILIARY_ADD_LIST_DATA () {
      let { data } = action.payload
      const { count, results } = data
      return state.mergeIn(
        ['pagination'], { total: count }
      ).merge({
        list: results,
        loading: false
      })
    },
    AUXILIARY_ADD_LIBRARY_DATA () {
      let { data } = action.payload
      if (!data.results[0]) {
        return state
      }
      return state.mergeIn(
        ['workOrderInfo'], data.results[0]
      )
    },
    AUXILIARY_RESET_DATA () {
      return state.merge({
        workOrderInfo: {},
        list: []
      })
    },
    AUXILIARY_CHANGE_MODAL_DATA () {
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
    const { payload = {} } = yield take(AUXILIARY_GET_LIST_DATA)
    const { callback, params = {} } = payload
    const data = yield call(fetchAPI, apis.ProcessAPI.getAuxiliaryQuotas, params)
    callback && callback(data)
    yield put(addListDataAction({ data: data }))
  }
}

export function *getLibrarySaga (type, body) {
  while (true) {
    const { payload = {} } = yield take(AUXILIARY_GET_LIBRARY_DATA)
    const { callback, params = {} } = payload
    const data = yield call(fetchAPI, apis.ProcessAPI.getQuotaList, params)
    callback && callback(data)
    yield put(addLibraryDataAction({ data: data }))
  }
}

export const sagas = [
  getListSaga,
  getLibrarySaga
]
