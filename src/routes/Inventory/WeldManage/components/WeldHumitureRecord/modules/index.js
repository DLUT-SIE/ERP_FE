import { put, call, take } from 'redux-saga/effects'
import Immutable from 'immutable'
import fetchAPI from 'api'
import { apis } from 'api/config'

// ------------------------------------
// Constants
// ------------------------------------

const HUMITURE_RECORD_GET_LIST_DATA = 'HUMITURE_RECORD_GET_LIST_DATA'
const HUMITURE_RECORD_ADD_LIST_DATA = 'HUMITURE_RECORD_ADD_LIST_DATA'
const HUMITURE_RECORD_CHANGE_MODAL_DATA = 'HUMITURE_RECORD_CHANGE_MODAL_DATA'
const PAGE_SIZE = 10

// ------------------------------------
// Actions
// ------------------------------------

function getListDataAction (body) {
  return {
    type    : HUMITURE_RECORD_GET_LIST_DATA,
    payload : body
  }
}

function addListDataAction (payload = {}) {
  return {
    type    : HUMITURE_RECORD_ADD_LIST_DATA,
    payload : payload
  }
}
function changeModalAction (payload = {}) {
  return {
    type    : HUMITURE_RECORD_CHANGE_MODAL_DATA,
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

export default function WeldHumitureRecord (state = initialState, action) {
  var map = {
    HUMITURE_RECORD_GET_LIST_DATA () {
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
    HUMITURE_RECORD_ADD_LIST_DATA () {
      let { data } = action.payload
      console.log('data==========', data)
      return state.mergeIn(
        ['pagination'], { total: data.count }
      ).merge({
        list: data.results,
        loading: false
      })
    },
    HUMITURE_RECORD_CHANGE_MODAL_DATA () {
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
    const { payload = {} } = yield take(HUMITURE_RECORD_GET_LIST_DATA)
    const { callback, params } = payload
    const data = yield call(fetchAPI, apis.InventoryAPI.getWeldHumitureRecord, params)
    // console.log('getListSaga==========',callback, data, params);
    callback && callback(data)
    yield put(addListDataAction({ data: data }))
  }
}

export const sagas = [
  getListSaga
]
