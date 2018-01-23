import { put, call, take } from 'redux-saga/effects'
import Immutable from 'immutable'
import _ from 'lodash'
import fetchAPI from 'api'
import { apis } from 'api/config'

// ------------------------------------
// Constants
// ------------------------------------

const DETAILTABLE_GET_LIST_DATA = 'DETAILTABLE_GET_LIST_DATA'
const DETAILTABLE_ADD_LIST_DATA = 'DETAILTABLE_ADD_LIST_DATA'
const PAGE_SIZE = 10

// ------------------------------------
// Actions
// ------------------------------------

function getListDataAction (body) {
  return {
    type    : DETAILTABLE_GET_LIST_DATA,
    payload : body
  }
}

function addListDataAction (payload = {}) {
  return {
    type    : DETAILTABLE_ADD_LIST_DATA,
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

export default function DetailTable (state = initialState, action) {
  var map = {
    DETAILTABLE_GET_LIST_DATA () {
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
    DETAILTABLE_ADD_LIST_DATA () {
      let { data, columns } = action.payload
      const params = {
        list: data.results,
        loading: false
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
    const { payload = {} } = yield take(DETAILTABLE_GET_LIST_DATA)
    const { callback, params } = payload
    const data = yield call(fetchAPI, apis.PurchaseAPI.getProcurementMaterials, params)
    callback && callback(data)
    yield put(addListDataAction({ data }))
  }
}

export const sagas = [
  getListSaga
]
