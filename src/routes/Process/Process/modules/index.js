import { put, call, take } from 'redux-saga/effects'
import Immutable from 'immutable'
import fetchAPI from 'api'
import { apis } from 'api/config'

// ------------------------------------
// Constants
// ------------------------------------

const PROCESS_GET_LIST_DATA = 'PROCESS_GET_LIST_DATA'
const PROCESS_ADD_LIST_DATA = 'PROCESS_ADD_LIST_DATA'
const PROCESS_CHANGE_ROUTE_MODAL = 'PROCESS_CHANGE_ROUTE_MODAL'
const PROCESS_CHANGE_WELD_MODAL = 'PROCESS_CHANGE_WELD_MODAL'

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

function changeRouteModalAction (payload = {}) {
  return {
    type    : PROCESS_CHANGE_ROUTE_MODAL,
    payload : payload
  }
}

function changeWeldModalAction (payload = {}) {
  return {
    type    : PROCESS_CHANGE_WELD_MODAL,
    payload : payload
  }
}

export const actions = {
  getListDataAction,
  addListDataAction,
  changeRouteModalAction,
  changeWeldModalAction
}

// ------------------------------------
// Reducer
// ------------------------------------
var initialState = Immutable.fromJS({
  loading: false,
  pagination: {
    pageSize: 10
  },
  workOrderInfo: {},
  routeModal: {
    visible: false
  },
  weldModal: {
    visible: false
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
      const { results, work_order: workOrder, production_name: productionName, unit } = data
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
    },
    PROCESS_CHANGE_ROUTE_MODAL () {
      return state.mergeIn(['routeModal'], action.payload)
    },
    PROCESS_CHANGE_WELD_MODAL () {
      return state.mergeIn(['weldModal'], action.payload)
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
