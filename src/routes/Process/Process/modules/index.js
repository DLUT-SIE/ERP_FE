import { put, call, take } from 'redux-saga/effects'
import Immutable from 'immutable'
import fetchAPI from 'api'
import { apis } from 'api/config'

// ------------------------------------
// Constants
// ------------------------------------

const PROCESS_GET_LIST_DATA = 'PROCESS_GET_LIST_DATA'
const PROCESS_ADD_LIST_DATA = 'PROCESS_ADD_LIST_DATA'

// ------------------------------------
// Actions
// ------------------------------------

function getListDataAction (body) {
  return {
    type    : PROCESS_GET_LIST_DATA,
    payload : body
  }
}

function addListDataAction (payload = {}) {
  return {
    type    : PROCESS_ADD_LIST_DATA,
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

export default function Process (state = initialState, action) {
  var map = {
    PROCESS_GET_LIST_DATA () {
      return state.set(
        'loading', true
      )
    },
    PROCESS_ADD_LIST_DATA () {
      let { data } = action.payload
      const { results, work_order: workOrder, process_name: processName, unit } = data
      return state.merge({
        list: results,
        workOrder,
        processName,
        unit,
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
    const { payload = {} } = yield take(PROCESS_GET_LIST_DATA)
    const { callback, params } = payload
    const [ data ] = yield [
      call(fetchAPI, apis.ProcessAPI.getProcessMaterials, params)
    ]
    callback && callback(data.results)
    yield put(addListDataAction({ data }))
  }
}

export const sagas = [
  getListSaga
]
