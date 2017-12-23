import { put, call, take } from 'redux-saga/effects'
import Immutable from 'immutable'
import fetchAPI from 'api'
import { apis } from 'api/config'

// ------------------------------------
// Constants
// ------------------------------------

const WELDINGSEAM_GET_LIST_DATA = 'WELDINGSEAM_GET_LIST_DATA'
const WELDINGSEAM_ADD_LIST_DATA = 'WELDINGSEAM_ADD_LIST_DATA'
const WELDINGSEAM_CHANGE_WELDINGSEAM_MODAL = 'WELDINGSEAM_CHANGE_WELDINGSEAM_MODAL'
const PAGE_SIZE = 10

// ------------------------------------
// Actions
// ------------------------------------

function getListDataAction (body) {
  return {
    type    : WELDINGSEAM_GET_LIST_DATA,
    payload : body
  }
}

function addListDataAction (payload = {}) {
  return {
    type    : WELDINGSEAM_ADD_LIST_DATA,
    payload : payload
  }
}

function changeWeldingSeamModalAction (payload = {}) {
  return {
    type    : WELDINGSEAM_CHANGE_WELDINGSEAM_MODAL,
    payload : payload
  }
}

export const actions = {
  getListDataAction,
  changeWeldingSeamModalAction
}

// ------------------------------------
// Reducer
// ------------------------------------
var initialState = Immutable.fromJS({
  loading: false,
  pagination: {
    pageSize: 10
  },
  weldingSeamModal: {
    visible: false
  },
  workOrderInfo: {}
})

export default function WeldingSeam (state = initialState, action) {
  var map = {
    WELDINGSEAM_GET_LIST_DATA () {
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
    WELDINGSEAM_ADD_LIST_DATA () {
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
    WELDINGSEAM_CHANGE_WELDINGSEAM_MODAL () {
      return state.mergeIn(['weldingSeamModal'], action.payload)
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
    const { payload = {} } = yield take(WELDINGSEAM_GET_LIST_DATA)
    const { callback, params = {} } = payload
    const data = yield call(fetchAPI, apis.ProcessAPI.getWeldingSeam, params)
    callback && callback(data)
    yield put(addListDataAction({ data: data }))
  }
}

export const sagas = [
  getListSaga
]
