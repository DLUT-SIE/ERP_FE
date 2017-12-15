import { put, call, take } from 'redux-saga/effects'
import Immutable from 'immutable'
import fetchAPI from 'api'
import { apis } from 'api/config'

// ------------------------------------
// Constants
// ------------------------------------

const BIDDOCUMENT_GET_PRODUCTION_LIST_DATA = 'BIDDOCUMENT_GET_PRODUCTION_LIST_DATA'
const BIDDOCUMENT_ADD_PRODUCTION_LIST_DATA = 'BIDDOCUMENT_ADD_PRODUCTION_LIST_DATA'
const BIDDOCUMENT_GET_WORKORDER_LIST_DATA = 'BIDDOCUMENT_GET_WORKORDER_LIST_DATA'
const BIDDOCUMENT_ADD_WORKORDER_LIST_DATA = 'BIDDOCUMENT_ADD_WORKORDER_LIST_DATA'
const BIDDOCUMENT_CHANGE_CHECK_MODAL_DATA = 'BIDDOCUMENT_CHANGE_CHECK_MODAL_DATA'
const BIDDOCUMENT_CHANGE_WORK_ORDER_MODAL_DATA = 'BIDDOCUMENT_CHANGE_WORK_ORDER_MODAL_DATA'
const PAGE_SIZE = 10

// ------------------------------------
// Actions
// ------------------------------------

function getProductionListDataAction (body) {
  return {
    type    : BIDDOCUMENT_GET_PRODUCTION_LIST_DATA,
    payload : body
  }
}

function addProductionListDataAction (payload = {}) {
  return {
    type    : BIDDOCUMENT_ADD_PRODUCTION_LIST_DATA,
    payload : payload
  }
}

function getWorkOrderListDataAction (body) {
  return {
    type    : BIDDOCUMENT_GET_WORKORDER_LIST_DATA,
    payload : body
  }
}

function addWorkOrderListDataAction (payload = {}) {
  return {
    type    : BIDDOCUMENT_ADD_WORKORDER_LIST_DATA,
    payload : payload
  }
}

function changeCheckModalAction (payload = {}) {
  return {
    type    : BIDDOCUMENT_CHANGE_CHECK_MODAL_DATA,
    payload : payload
  }
}

function changeWorkOrderModalAction (payload = {}) {
  return {
    type    : BIDDOCUMENT_CHANGE_WORK_ORDER_MODAL_DATA,
    payload : payload
  }
}

export const actions = {
  getProductionListDataAction,
  getWorkOrderListDataAction,
  changeCheckModalAction,
  changeWorkOrderModalAction
}

// ------------------------------------
// Reducer
// ------------------------------------
var initialState = Immutable.fromJS({
  productionLoading: false,
  productionPagination: {
    pageSize: 10
  },
  workOrderLoading: false,
  workOrderPagination: {
    pageSize: 10
  },
  checkModal: {
    visible: false
  },
  workOrderModal: {
    visible: false
  }
})

export default function Production (state = initialState, action) {
  var map = {
    BIDDOCUMENT_GET_PRODUCTION_LIST_DATA () {
      let { params = {} } = action.payload
      return state.mergeIn(
        ['productionPagination'], {
          current: +(params.page || 1),
          pageSize: +(params.limit || PAGE_SIZE)
        }
      ).set(
        'productionLoading', true
      )
    },
    BIDDOCUMENT_ADD_PRODUCTION_LIST_DATA () {
      let { data } = action.payload
      return state.mergeIn(
        ['productionPagination'], { total: data.count }
      ).merge({
        productionList: data.results,
        productionLoading: false
      })
    },
    BIDDOCUMENT_GET_WORKORDER_LIST_DATA () {
      let { params = {} } = action.payload
      return state.mergeIn(
        ['workOrderPagination'], {
          current: +(params.page || 1),
          pageSize: +(params.limit || PAGE_SIZE)
        }
      ).set(
        'workOrderLoading', true
      )
    },
    BIDDOCUMENT_ADD_WORKORDER_LIST_DATA () {
      let { data } = action.payload
      return state.mergeIn(
        ['workOrderPagination'], { total: data.count }
      ).merge({
        workOrderList: data.results,
        workOrderLoading: false
      })
    },
    BIDDOCUMENT_CHANGE_CHECK_MODAL_DATA () {
      return state.mergeIn(['checkModal'], action.payload)
    },
    BIDDOCUMENT_CHANGE_WORK_ORDER_MODAL_DATA () {
      return state.mergeIn(['workOrderModal'], action.payload)
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

export function *getProductionListSaga (type, body) {
  while (true) {
    const { payload = {} } = yield take(BIDDOCUMENT_GET_PRODUCTION_LIST_DATA)
    const { callback, params } = payload
    const data = yield call(fetchAPI, apis.Distribution.getProFileList, params)
    callback && callback()
    yield put(addProductionListDataAction({ data: data }))
  }
}

export function *getWorkOrderListSaga (type, body) {
  while (true) {
    const { payload = {} } = yield take(BIDDOCUMENT_GET_WORKORDER_LIST_DATA)
    const { callback, params } = payload
    const data = yield call(fetchAPI, apis.Distribution.getWorkOrderList, params)
    callback && callback()
    yield put(addWorkOrderListDataAction({ data: data }))
  }
}

export const sagas = [
  getProductionListSaga,
  getWorkOrderListSaga
]
