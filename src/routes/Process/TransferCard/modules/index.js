import { put, call, take } from 'redux-saga/effects'
import Immutable from 'immutable'
import fetchAPI from 'api'
import { apis } from 'api/config'

// ------------------------------------
// Constants
// ------------------------------------

const TRANSFER_GET_LIST_DATA = 'TRANSFER_GET_LIST_DATA'
const TRANSFER_ADD_LIST_DATA = 'TRANSFER_ADD_LIST_DATA'

// ------------------------------------
// Actions
// ------------------------------------

function getListDataAction (body) {
  return {
    type    : TRANSFER_GET_LIST_DATA,
    payload : body
  }
}

function addListDataAction (payload = {}) {
  return {
    type    : TRANSFER_ADD_LIST_DATA,
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
  workOrderInfo: {}
})

export default function TransferCard (state = initialState, action) {
  var map = {
    TRANSFER_GET_LIST_DATA () {
      return state.set(
        'loading', true
      )
    },
    TRANSFER_ADD_LIST_DATA () {
      let { data } = action.payload
      const { results, work_order_uid: workOrder, name: productionName, unit } = data
      return state.mergeIn(
        ['workOrderInfo'], {
          workOrder,
          productionName,
          unit
        }
      ).merge({
        list: results,
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
    const { payload = {} } = yield take(TRANSFER_GET_LIST_DATA)
    const { callback, params } = payload
    const data = yield call(fetchAPI, apis.ProcessAPI.getTransferCards, params)
    callback && callback(data)
    yield put(addListDataAction({ data }))
  }
}

export const sagas = [
  getListSaga
]
