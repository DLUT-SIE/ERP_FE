import { put, call, take } from 'redux-saga/effects'
import Immutable from 'immutable'
import fetchAPI from 'api'
import { apis } from 'api/config'

// ------------------------------------
// Constants
// ------------------------------------

const PRODUCTIONSEND_GET_LIST_DATA = 'PRODUCTIONSEND_GET_LIST_DATA'
const PRODUCTIONSEND_ADD_LIST_DATA = 'PRODUCTIONSEND_ADD_LIST_DATA'
const PAGE_SIZE = 10

// ------------------------------------
// Actions
// ------------------------------------

function getListDataAction (body) {
  return {
    type    : PRODUCTIONSEND_GET_LIST_DATA,
    payload : body
  }
}

function addListDataAction (payload = {}) {
  return {
    type    : PRODUCTIONSEND_ADD_LIST_DATA,
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
  },
  columns: []
})

export default function ProductionSend (state = initialState, action) {
  var map = {
    PRODUCTIONSEND_GET_LIST_DATA () {
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
    PRODUCTIONSEND_ADD_LIST_DATA () {
      let { data, columns } = action.payload
      return state.mergeIn(
        ['pagination'], { total: data.count }
      ).merge({
        list: data.results,
        columns: columns,
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

export function *getListSaga (type, body) {
  while (true) {
    const { payload = {} } = yield take(PRODUCTIONSEND_GET_LIST_DATA)
    const { callback, params } = payload
    const data = yield call(fetchAPI, apis.Distribution.getProFileList, params)
    callback && callback(data)
    yield put(addListDataAction({ data: data }))
  }
}

export const sagas = [
  getListSaga
]
