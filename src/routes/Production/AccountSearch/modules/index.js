import { put, call, take } from 'redux-saga/effects'
import Immutable from 'immutable'
import fetchAPI from 'api'
import { apis } from 'api/config'

// ------------------------------------
// Constants
// ------------------------------------

const ACCOUNT_SEARCH_GET_LIST_DATA = 'ACCOUNT_SEARCH_GET_LIST_DATA'
const ACCOUNT_SEARCH_ADD_LIST_DATA = 'ACCOUNT_SEARCH_ADD_LIST_DATA'
const ACCOUNT_SEARCH_CHANGE_MODAL_DATA = 'ACCOUNT_SEARCH_CHANGE_MODAL_DATA'
const PAGE_SIZE = 10

// ------------------------------------
// Actions
// ------------------------------------

function getListDataAction (body) {
  return {
    type    : ACCOUNT_SEARCH_GET_LIST_DATA,
    payload : body
  }
}

function addListDataAction (payload = {}) {
  return {
    type    : ACCOUNT_SEARCH_ADD_LIST_DATA,
    payload : payload
  }
}
function changeModalAction (payload = {}) {
  return {
    type    :ACCOUNT_SEARCH_CHANGE_MODAL_DATA,
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
  },
  modal: {
    visible: false,
    editDateVisible: false
  }
})

export default function AccountSearch (state = initialState, action) {
  var map = {
    ACCOUNT_SEARCH_GET_LIST_DATA () {
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
    ACCOUNT_SEARCH_ADD_LIST_DATA () {
      let { data } = action.payload
      return state.mergeIn(
        ['pagination'], { total: data.count }
      ).merge({
        list: data.results,
        loading: false
      })
    },
    ACCOUNT_SEARCH_CHANGE_MODAL_DATA () {
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
    const { payload = {} } = yield take(ACCOUNT_SEARCH_GET_LIST_DATA)
    const { callback, params } = payload
    const data = yield call(fetchAPI, apis.ProductionAPI.getSubMaterialLedgers, params)
    callback && callback(data)
    yield put(addListDataAction({ data: data }))
  }
}

export const sagas = [
  getListSaga
]
