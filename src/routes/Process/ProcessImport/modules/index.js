import { put, call, take } from 'redux-saga/effects'
import Immutable from 'immutable'
import fetchAPI from 'api'
import { apis } from 'api/config'

// ------------------------------------
// Constants
// ------------------------------------

const IMPORT_GET_LIST_DATA = 'IMPORT_GET_LIST_DATA'
const IMPORT_ADD_LIST_DATA = 'IMPORT_ADD_LIST_DATA'
const PAGE_SIZE = 10

// ------------------------------------
// Actions
// ------------------------------------

function getListDataAction (body) {
  return {
    type    : IMPORT_GET_LIST_DATA,
    payload : body
  }
}

function addListDataAction (payload = {}) {
  return {
    type    : IMPORT_ADD_LIST_DATA,
    payload : payload
  }
}

export const actions = {
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

export default function ProcessImport (state = initialState, action) {
  var map = {
    IMPORT_GET_LIST_DATA () {
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
    IMPORT_ADD_LIST_DATA () {
      let { list } = action.payload
      return state.mergeIn(
        ['pagination'], { total: list.count }
      ).merge({
        loading: false,
        ...action.payload
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
export function *getListSaga (type, body) {
  while (true) {
    const { payload = {} } = yield take(IMPORT_GET_LIST_DATA)
    const { callback, params = {} } = payload
    const [ list ] = yield [
      call(fetchAPI, apis.ProcessAPI.getProductList, params)
    ]
    callback && callback(list.results)
    yield put(addListDataAction({ list: list.results }))
  }
}

export const sagas = [
  getListSaga
]
