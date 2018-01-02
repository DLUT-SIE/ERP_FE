import { put, call, take } from 'redux-saga/effects'
import Immutable from 'immutable'
import fetchAPI from 'api'
import { apis } from 'api/config'

// ------------------------------------
// Constants
// ------------------------------------

const DETAILEDLIST_GET_LIST_DATA = 'DETAILEDLIST_GET_LIST_DATA'
const DETAILEDLIST_ADD_LIST_DATA = 'DETAILEDLIST_ADD_LIST_DATA'
const DETAILEDLIST_GET_LIBRARY_DATA = 'DETAILEDLIST_GET_LIBRARY_DATA'
const DETAILEDLIST_ADD_LIBRARY_DATA = 'DETAILEDLIST_ADD_LIBRARY_DATA'
const DETAILEDLIST_RESET_DATA = 'DETAILEDLIST_RESET_DATA'
const DETAILEDLIST_CHANGE_MODAL_DATA = 'DETAILEDLIST_CHANGE_MODAL_DATA'
const PAGE_SIZE = 10

// ------------------------------------
// Actions
// ------------------------------------

function getListDataAction (body) {
  return {
    type    : DETAILEDLIST_GET_LIST_DATA,
    payload : body
  }
}

function addListDataAction (payload = {}) {
  return {
    type    : DETAILEDLIST_ADD_LIST_DATA,
    payload : payload
  }
}

function getLibraryDataAction (body) {
  return {
    type    : DETAILEDLIST_GET_LIBRARY_DATA,
    payload : body
  }
}

function addLibraryDataAction (payload = {}) {
  return {
    type    : DETAILEDLIST_ADD_LIBRARY_DATA,
    payload : payload
  }
}

function resetDataAction (payload = {}) {
  return {
    type    : DETAILEDLIST_RESET_DATA,
    payload : payload
  }
}

function changeModalAction (payload = {}) {
  return {
    type    : DETAILEDLIST_CHANGE_MODAL_DATA,
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

export default function DetailedList (state = initialState, action) {
  var map = {
    DETAILEDLIST_GET_LIST_DATA () {
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
    DETAILEDLIST_ADD_LIST_DATA () {
      let { data } = action.payload
      const { count, results } = data
      return state.mergeIn(
        ['pagination'], { total: count }
      ).merge({
        list: results,
        loading: false
      })
    },
    DETAILEDLIST_ADD_LIBRARY_DATA () {
      let { data } = action.payload
      return state.merge({
        workOrderInfo: data.results[0] || {}
      })
    },
    DETAILEDLIST_RESET_DATA () {
      return state.merge({
        workOrderInfo: {},
        list: []
      })
    },
    DETAILEDLIST_CHANGE_MODAL_DATA () {
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
    const { payload = {} } = yield take(DETAILEDLIST_GET_LIST_DATA)
    const { callback, params = {}, api } = payload
    const data = yield call(fetchAPI, apis.ProcessAPI[api], params)
    callback && callback(data)
    yield put(addListDataAction({ data: data }))
  }
}

export function *getLibrarySaga (type, body) {
  while (true) {
    const { payload = {} } = yield take(DETAILEDLIST_GET_LIBRARY_DATA)
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
