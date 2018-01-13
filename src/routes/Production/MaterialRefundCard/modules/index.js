import { put, call, take } from 'redux-saga/effects'
import _ from 'lodash'
import Immutable from 'immutable'
import fetchAPI from 'api'
import { apis } from 'api/config'

// ------------------------------------
// Constants
// ------------------------------------

const REFUND_CARD_GET_LIST_DATA = 'REFUND_CARD_GET_LIST_DATA'
const REFUND_CARD_ADD_LIST_DATA = 'REFUND_CARD_ADD_LIST_DATA'
const REFUND_CARD_CHANGE_MODAL_DATA = 'REFUND_CARD_CHANGE_MODAL_DATA'
const PAGE_SIZE = 10

// ------------------------------------
// Actions
// ------------------------------------

function getListDataAction (body) {
  return {
    type    : REFUND_CARD_GET_LIST_DATA,
    payload : body
  }
}

function addListDataAction (payload = {}) {
  return {
    type    : REFUND_CARD_ADD_LIST_DATA,
    payload : payload
  }
}
function changeModalAction (payload = {}) {
  return {
    type    :REFUND_CARD_CHANGE_MODAL_DATA,
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

export default function RefundCard (state = initialState, action) {
  var map = {
    REFUND_CARD_GET_LIST_DATA () {
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
    REFUND_CARD_ADD_LIST_DATA () {
      let { data } = action.payload
      return state.mergeIn(
        ['pagination'], { total: data.count }
      ).merge({
        list: data.results,
        loading: false
      })
    },
    REFUND_CARD_CHANGE_MODAL_DATA () {
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
const mapRequest = {
  welding_material_refund_cards: apis.ProductionAPI.getWeldingMaterialRefundCards,
  steel_material_refund_cards: apis.ProductionAPI.getSteelMaterialRefundCards,
  bought_in_component_refund_cards: apis.ProductionAPI.getBroughtInMaterialRefundCards,
  auxiliary_material_refund_cards: apis.ProductionAPI.getAuxiliaryMaterialRefundCards
}
export function *getListSaga (type, body) {
  while (true) {
    const { payload = {} } = yield take(REFUND_CARD_GET_LIST_DATA)
    const { callback, params } = payload
    let category = mapRequest[params.category]
    if (_.isUndefined(category)) {
      category = apis.ProductionAPI.getWeldingMaterialRefundCards
    }
    const data = yield call(fetchAPI, category, params)
    callback && callback(data)
    yield put(addListDataAction({ data: data }))
  }
}

export const sagas = [
  getListSaga
]
