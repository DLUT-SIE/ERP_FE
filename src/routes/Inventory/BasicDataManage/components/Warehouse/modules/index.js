import { put, call, take } from 'redux-saga/effects'
import Immutable from 'immutable'
import fetchAPI from 'api'
import { apis } from 'api/config'

// ------------------------------------
// Constants
// ------------------------------------

const WAREHOUSE_GET_LIST_DATA = 'WAREHOUSE_GET_LIST_DATA'
const WAREHOUSE_ADD_LIST_DATA = 'WAREHOUSE_ADD_LIST_DATA'
const WAREHOUSE_CHANGE_MODAL_DATA = 'WAREHOUSE_CHANGE_MODAL_DATA'
const PAGE_SIZE = 10

// ------------------------------------
// Actions
// ------------------------------------

function getListDataAction (body) {
  return {
    type    : WAREHOUSE_GET_LIST_DATA,
    payload : body
  }
}

function addListDataAction (payload = {}) {
  return {
    type    : WAREHOUSE_ADD_LIST_DATA,
    payload : payload
  }
}
function changeModalAction (payload = {}) {
  return {
    type    : WAREHOUSE_CHANGE_MODAL_DATA,
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
    visible: false
  }
})

export default function WareHouse (state = initialState, action) {
  var map = {
    WAREHOUSE_GET_LIST_DATA () {
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
    WAREHOUSE_ADD_LIST_DATA () {
      let { data } = action.payload
      return state.mergeIn(
        ['pagination'], { total: data.count }
      ).merge({
        list: data.results,
        loading: false
      })
    },
    WAREHOUSE_CHANGE_MODAL_DATA () {
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
    const { payload = {} } = yield take(WAREHOUSE_GET_LIST_DATA)
    const { callback, params } = payload
    const data = yield call(fetchAPI, apis.InventoryAPI.getWarehouseRecords, params)
    callback && callback(data)
    yield put(addListDataAction({ data: data }))
  }
}

export const sagas = [
  getListSaga
]
