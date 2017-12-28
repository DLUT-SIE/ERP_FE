import { put, call, take } from 'redux-saga/effects'
import Immutable from 'immutable'
import fetchAPI from 'api'
import { apis } from 'api/config'

// ------------------------------------
// Constants
// ------------------------------------

const WELDING_GET_LIST_DATA = 'WELDING_GET_LIST_DATA'
const WELDING_ADD_LIST_DATA = 'WELDING_ADD_LIST_DATA'
const WELDING_CHANGE_MODAL_DATA = 'WELDING_CHANGE_MODAL_DATA'
const PAGE_SIZE = 10

// ------------------------------------
// Actions
// ------------------------------------

function getListDataAction (body) {
  return {
    type    : WELDING_GET_LIST_DATA,
    payload : body
  }
}

function addListDataAction (payload = {}) {
  return {
    type    : WELDING_ADD_LIST_DATA,
    payload : payload
  }
}

function changeModalAction (payload = {}) {
  return {
    type    : WELDING_CHANGE_MODAL_DATA,
    payload : payload
  }
}

export const actions = {
  getListDataAction,
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
  },
  workOrderInfo: {}
})

export default function WeldingQuota (state = initialState, action) {
  var map = {
    WELDING_GET_LIST_DATA () {
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
    WELDING_ADD_LIST_DATA () {
      let { data } = action.payload
      const { count, results, work_order_uid: workOrder, production_name: productionName, unit, writer, proofreader } = data
      return state.mergeIn(
        ['pagination'], { total: count }
      ).mergeIn(
        ['workOrderInfo'], {
          workOrder,
          productionName,
          unit,
          writer,
          proofreader
        }
      ).merge({
        list: results,
        loading: false
      })
    },
    WELDING_CHANGE_MODAL_DATA () {
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
    const { payload = {} } = yield take(WELDING_GET_LIST_DATA)
    const { callback, params = {} } = payload
    const data = yield call(fetchAPI, apis.ProcessAPI.getWeldingQuota, params)
    callback && callback(data)
    yield put(addListDataAction({ data: data }))
  }
}

export const sagas = [
  getListSaga
]
