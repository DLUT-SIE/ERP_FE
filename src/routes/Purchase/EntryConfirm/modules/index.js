import { put, call, take } from 'redux-saga/effects'
import Immutable from 'immutable'
import _ from 'lodash'
import fetchAPI from 'api'
import { apis } from 'api/config'

// ------------------------------------
// Constants
// ------------------------------------

const ENTRYCONFIRM_GET_LIST_DATA = 'ENTRYCONFIRM_GET_LIST_DATA'
const ENTRYCONFIRM_ADD_LIST_DATA = 'ENTRYCONFIRM_ADD_LIST_DATA'
const PAGE_SIZE = 10

// ------------------------------------
// Actions
// ------------------------------------

function getListDataAction (body) {
  return {
    type    : ENTRYCONFIRM_GET_LIST_DATA,
    payload : body
  }
}

function addListDataAction (payload = {}) {
  return {
    type    : ENTRYCONFIRM_ADD_LIST_DATA,
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

export default function EntryConfirm (state = initialState, action) {
  var map = {
    ENTRYCONFIRM_GET_LIST_DATA () {
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
    ENTRYCONFIRM_ADD_LIST_DATA () {
      let { data, columns } = action.payload
      const params = {
        loading: false,
        list: data.results
      }
      if (!_.isUndefined(columns)) {
        params.columns = columns
      }
      return state.mergeIn(
        ['pagination'], { total: data.count }
      ).merge(params)
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
    const { payload = {} } = yield take(ENTRYCONFIRM_GET_LIST_DATA)
    const { callback, params, api } = payload
    const data = yield call(fetchAPI, apis.InventoryAPI[api], params)
    callback && callback(data)
    yield put(addListDataAction({ data }))
  }
}

export const sagas = [
  getListSaga
]
