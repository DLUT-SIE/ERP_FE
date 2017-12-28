import { put, call, take } from 'redux-saga/effects'
import Immutable from 'immutable'
import fetchAPI from 'api'
import { apis } from 'api/config'

// ------------------------------------
// Constants
// ------------------------------------

const STEEL_INVENTORY_ACCOUNT_GET_LIST_DATA = 'STEEL_INVENTORY_ACCOUNT_GET_LIST_DATA'
const STEEL_INVENTORY_ACCOUNT_ADD_LIST_DATA = 'STEEL_INVENTORY_ACCOUNT_ADD_LIST_DATA'
const STEEL_INVENTORY_ACCOUNT_CHANGE_MODAL_DATA = 'STEEL_INVENTORY_ACCOUNT_CHANGE_MODAL_DATA'
const PAGE_SIZE = 10

// ------------------------------------
// Actions
// ------------------------------------

function getListDataAction (body) {
  return {
    type    : STEEL_INVENTORY_ACCOUNT_GET_LIST_DATA,
    payload : body
  }
}

function addListDataAction (payload = {}) {
  return {
    type    : STEEL_INVENTORY_ACCOUNT_ADD_LIST_DATA,
    payload : payload
  }
}
function changeModalAction (payload = {}) {
  return {
    type    : STEEL_INVENTORY_ACCOUNT_CHANGE_MODAL_DATA,
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

export default function SteelInventoryAccount (state = initialState, action) {
  var map = {
    STEEL_INVENTORY_ACCOUNT_GET_LIST_DATA () {
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
    STEEL_INVENTORY_ACCOUNT_ADD_LIST_DATA () {
      let { data } = action.payload
      return state.mergeIn(
        ['pagination'],
      ).merge({
        list: data.results,
        loading: false
      })
    },
    STEEL_INVENTORY_ACCOUNT_CHANGE_MODAL_DATA () {
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
    const { payload = {} } = yield take(STEEL_INVENTORY_ACCOUNT_GET_LIST_DATA)
    const { callback, params } = payload
    const data = yield call(fetchAPI, apis.InventoryAPI.getSteelInventoryAccount, params)
    callback && callback(data)
    yield put(addListDataAction({ data: data }))
  }
}

export const sagas = [
  getListSaga
]
