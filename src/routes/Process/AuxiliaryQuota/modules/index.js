import { put, call, take } from 'redux-saga/effects'
import Immutable from 'immutable'
import fetchAPI from 'api'
import { apis } from 'api/config'

// ------------------------------------
// Constants
// ------------------------------------

const AUXILIARY_GET_LIST_DATA = 'AUXILIARY_GET_LIST_DATA'
const AUXILIARY_ADD_LIST_DATA = 'AUXILIARY_ADD_LIST_DATA'
const AUXILIARY_CHANGE_MODAL_DATA = 'AUXILIARY_CHANGE_MODAL_DATA'
const PAGE_SIZE = 10

// ------------------------------------
// Actions
// ------------------------------------

function getListDataAction (body) {
  return {
    type    : AUXILIARY_GET_LIST_DATA,
    payload : body
  }
}

function addListDataAction (payload = {}) {
  return {
    type    : AUXILIARY_ADD_LIST_DATA,
    payload : payload
  }
}

function changeModalAction (payload = {}) {
  return {
    type    : AUXILIARY_CHANGE_MODAL_DATA,
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
  }
})

export default function PrincipalQuota (state = initialState, action) {
  var map = {
    AUXILIARY_GET_LIST_DATA () {
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
    AUXILIARY_ADD_LIST_DATA () {
      let { data } = action.payload
      const { count, results, work_order_uid: workOrder, production_name: productionName, unit, writer, proofreader } = data
      return state.mergeIn(
        ['pagination'], { total: count }
      ).merge({
        workOrder,
        productionName,
        unit,
        writer,
        proofreader,
        list: results,
        loading: false
      })
    },
    AUXILIARY_CHANGE_MODAL_DATA () {
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
    const { payload = {} } = yield take(AUXILIARY_GET_LIST_DATA)
    const { callback, params = {} } = payload
    const data = yield call(fetchAPI, apis.ProcessAPI.getAuxiliaryQuota, params)
    callback && callback(data)
    yield put(addListDataAction({ data: data }))
  }
}

export const sagas = [
  getListSaga
]
