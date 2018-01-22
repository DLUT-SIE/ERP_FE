import { put, call, take } from 'redux-saga/effects'
import Immutable from 'immutable'
import _ from 'lodash'
import fetchAPI from 'api'
import { apis } from 'api/config'

// ------------------------------------
// Constants
// ------------------------------------

const SUMMARIZE_GET_LIST_DATA = 'SUMMARIZE_GET_LIST_DATA'
const SUMMARIZE_ADD_LIST_DATA = 'SUMMARIZE_ADD_LIST_DATA'
const SUMMARIZE_CHANGE_ORDER_MODAL = 'SUMMARIZE_CHANGE_ORDER_MODAL'
const SUMMARIZE_CHANGE_ORDER_SELECT_MODAL = 'SUMMARIZE_CHANGE_ORDER_SELECT_MODAL'
const PAGE_SIZE = 10

// ------------------------------------
// Actions
// ------------------------------------

function getListDataAction (body) {
  return {
    type    : SUMMARIZE_GET_LIST_DATA,
    payload : body
  }
}

function addListDataAction (payload = {}) {
  return {
    type    : SUMMARIZE_ADD_LIST_DATA,
    payload : payload
  }
}

function changeOrderModalAction (payload = {}) {
  return {
    type    : SUMMARIZE_CHANGE_ORDER_MODAL,
    payload : payload
  }
}

function changeOrderSelectModalAction (payload = {}) {
  return {
    type    : SUMMARIZE_CHANGE_ORDER_SELECT_MODAL,
    payload : payload
  }
}

export const actions = {
  getListDataAction,
  addListDataAction,
  changeOrderModalAction,
  changeOrderSelectModalAction
}

// ------------------------------------
// Reducer
// ------------------------------------
var initialState = Immutable.fromJS({
  loading: false,
  pagination: {
    pageSize: 10
  },
  columns: [],
  orderModal: {
    visible: false
  },
  orderSelectModal: {
    visible: false
  }
})

export default function MaterialSummarize (state = initialState, action) {
  var map = {
    SUMMARIZE_GET_LIST_DATA () {
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
    SUMMARIZE_ADD_LIST_DATA () {
      let { materialData, purchaseOrderData, columns } = action.payload
      purchaseOrderData = _.map(purchaseOrderData.results, (item) => {
        return {
          value: item.id,
          label: item.uid
        }
      })
      const params = {
        loading: false,
        list: materialData.results,
        purchaseOrderList: purchaseOrderData
      }
      if (columns) {
        params.columns = columns
      }
      return state.mergeIn(
        ['pagination'], { total: materialData.count }
      ).merge(params)
    },
    SUMMARIZE_CHANGE_ORDER_MODAL () {
      return state.mergeIn(['orderModal'], action.payload)
    },
    SUMMARIZE_CHANGE_ORDER_SELECT_MODAL () {
      return state.mergeIn(['orderSelectModal'], action.payload)
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
    const { payload = {} } = yield take(SUMMARIZE_GET_LIST_DATA)
    const { callback, params } = payload
    const inventoryType = +params.inventory_type
    let category
    if (inventoryType === 5) {
      category = 2
    } else if (inventoryType > 2) {
      category = 1
    } else {
      category = 0
    }
    const [ materialData, purchaseOrderData ] = yield [
      call(fetchAPI, apis.PurchaseAPI.getProcurementMaterialsWithStatus, params),
      call(fetchAPI, apis.PurchaseAPI.getPurchaseOrders, { category })
    ]
    callback && callback(materialData, purchaseOrderData)
    yield put(addListDataAction({ materialData, purchaseOrderData }))
  }
}

export const sagas = [
  getListSaga
]
